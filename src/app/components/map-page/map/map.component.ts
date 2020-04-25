import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { BarPropertiesService } from 'src/app/services/bar-properties.service';
import { barProperties } from '../../../models/bar-properties.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarPropertiesModalComponent } from '../../modals/bar-properties-modal/bar-properties-modal.component';
import { GeoJson, FeatureCollection } from '../../class/map-class';
import * as L from 'leaflet';

declare var require: any;
const lightRedMarker: string = require('./../../../../icons/markers/marker-light-red.svg');
const blueMarker: string = require('./../../../../icons/markers/marker-blue.svg');
const blueMarkerPng: string = require('./../../../../icons/markers/marker-blue.png');

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
	public markers: any[] = [];
	private map: any;
	public leafletOptions: any;
	public leafletLayers: any;
	
	@Input() iconChangeId: number;

	constructor(
		private markerService: BarPropertiesService,
		public dialog: MatDialog,
		private cd: ChangeDetectorRef,
	) { }

	ngOnInit(): void {
		// this.initMap();

		// const tiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		// 	maxZoom: 19,
		// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		// });
		// tiles.addTo(this.map);

		this.leafletOptions = {
			layers: [
				L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
					maxZoom: 19,
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				})
			],
			zoom: 13,
			center: L.latLng(48.8534, 2.3488)
		};

		const icon = L.icon({
			iconUrl: blueMarker,
			iconSize: [25, 45],
			iconAnchor: [12, 44],
			popupAnchor: [1, -45],
		});

		this.markerService.getMarkers().subscribe((bars: barProperties[]) => {
			this.leafletLayers = bars.map((bar: barProperties) => {
				return L.marker(bar.coordinates, {icon: icon});
			})
		})
	}
			
	ngOnChanges(changes: SimpleChanges): void {
		console.log('change')
		const iconId = changes.iconChangeId;
		if (iconId.currentValue != iconId.previousValue) {
			this.changeIconColor(iconId.currentValue, true);
			this.centerLeafletMapOnMarker(iconId.currentValue);
		}
		if (iconId.previousValue != null) {
			this.changeIconColor(iconId.previousValue, false);
		}
	}

	private initMap(): void {
		this.map = L.map('map', {
			zoomControl: false,
			center: [ 48.8534, 2.3488 ],
			zoom: 14
		})
		L.control.zoom({
			position:'topright'
		}).addTo(this.map);
	}
	
	public changeIconColor(id: number, isSelected?: boolean) {
		const icon = L.icon({
			iconUrl: isSelected ? lightRedMarker : blueMarker,
			iconSize: [25, 45],
			iconAnchor: [12, 44],
			popupAnchor: [1, -45],
		});
		const marker = this.markers.find(marker => marker.bar.id === id);
		marker.setIcon(icon);
	}
	
	private centerLeafletMapOnMarker(id: number) {
		const marker = this.markers.find(marker => marker.bar.id === id)
		this.map.setView(marker.getLatLng(), 14);
	}
	
	private addMarkers(): void {
		const icon = L.icon({
			iconUrl: blueMarker,
			iconSize: [25, 45],
			iconAnchor: [12, 44],
			popupAnchor: [1, -45],
		});
				
		this.markerService.getMarkers().subscribe((bars: barProperties[]) => {
			bars.map((bar: barProperties) => {
				const marker: any = L.marker(bar.coordinates, {
					icon: icon,
				})
				.addTo(this.map)
				// .bindPopup(bar.name)
				.on('click', (e) => this.onMarkerClick(e, this));
				
				marker.bar = bar;
				
				this.markers.push(marker);
			})
		})
	}
			
	private onMarkerClick(e: any, that: any) {
		that.iconChangeId = e.target.bar.id;
		that.dialog.open(BarPropertiesModalComponent, {
			width: '400px',
			position: { bottom: 1 + 'rem' },
			data: e.target.bar,
			backdropClass: 'dialog-remove-overlay'
		});
	}
}
		// private initializeMap() {
	
		// 	if (navigator.geolocation) {
		// 		navigator.geolocation.getCurrentPosition(position => {
		// 			this.lat = position.coords.latitude;
		// 			this.lng = position.coords.longitude;
		// 			this.map.flyTo({
		// 				center: [this.lng, this.lat]
		// 			})
		// 		});
		// 	}
		// 	this.buildMap()
		// }
		
		// buildMap(): void {
		// 	this.map = new mapboxgl.Map({
		// 		container: 'map',
		// 		style: this.style,
		// 		zoom: 14,
		// 		center: [this.lng, this.lat]
		// 	});
			
		// 	this.map.addControl(new mapboxgl.NavigationControl());
			
		// 	this.map.on('load', () => {
		// 		this.map.loadImage(blueMarkerPng, (error, image) => {
		// 			if (error) throw error;
		// 			this.map.addImage('blueMarker', image);
		// 		});
	
		// 		this.map.addSource('dbMarkers', {
		// 			type: 'geojson',
		// 			cluster: true,
		// 			data: {
		// 				type: 'FeatureCollection',
		// 				features: []
		// 			}
		// 		});
				
		// 		this.source = this.map.getSource('dbMarkers');
	
		// 		this.mapMarkers.subscribe(markers => {
		// 			let data = new FeatureCollection(markers)
		// 			this.source.setData(data)
		// 		})
	
		// 		this.map.on('click', 'clusters', (e) => {
		// 			this.map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 13, speed: 0.5 });
		// 		});
	
		// 		this.map.addLayer({
		// 			id: 'clusters',
		// 			type: 'circle',
		// 			source: 'dbMarkers',
		// 			filter: ['has', 'point_count'],
		// 			paint: {
		// 				'circle-color': {
		// 					property: 'point_count',
		// 					type: 'interval',
		// 					stops: [
		// 						[0, '#51bbd6'],
		// 						[20, '#f1f075'],
		// 						[40, '#f28cb1'],
		// 					]
		// 				},
		// 				'circle-radius': {
		// 					property: 'point_count',
		// 					type: 'interval',
		// 					stops: [
		// 						[0, 20],
		// 						[20, 30],
		// 						[40, 40]
		// 					]
		// 				}
		// 			}
		// 		});
						
		// 		this.map.addLayer({
		// 			id: 'cluster-count',
		// 			type: 'symbol',
		// 			source: 'dbMarkers',
		// 			filter: ['has', 'point_count'],
		// 			layout: {
		// 				'text-field': '{point_count_abbreviated}',
		// 				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		// 				'text-size': 12
		// 			}
		// 		});
	
		// 		// create map layers with realtime data
		// 		this.map.addLayer({
		// 			id: 'dbMarkers',
		// 			source: 'dbMarkers',
		// 			type: 'symbol',
		// 			filter: ['!', ['has', 'point_count']],
		// 			layout: {
		// 				'icon-image': "blueMarker",
		// 				'icon-size': 0.6,
		// 				'icon-anchor': 'bottom',
		// 				'icon-allow-overlap': true,
		// 			},
		// 		})
	
		// 		this.map.addLayer({
		// 			id: 'dbMarkers-text',
		// 			type: 'symbol',
		// 			source: 'dbMarkers',
		// 			filter: ['!', ['has', 'point_count']],
		// 			layout: {
		// 				'text-field': '{id}',
		// 				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
		// 				'text-size': 12,
		// 				'text-offset': [-0.1,-2.2],
		// 				'text-allow-overlap': true
		// 			}
		// 		});
		// 		const mapCursor = this.map.getCanvas();
	
		// 		this.map.on('mouseenter', 'clusters', () => mapCursor.style.cursor = 'pointer');
		// 		this.map.on('mouseleave', 'clusters', () => mapCursor.style.cursor = '');
	
		// 		this.map.on('mouseenter', 'dbMarkers', () => mapCursor.style.cursor = 'pointer');
		// 		this.map.on('mouseleave', 'dbMarkers', () => mapCursor.style.cursor = '');
			
		// 	});
		// }
	
		// flyTo(data: GeoJson) {
		// 	this.map.flyTo({
		// 		center: data.geometry.coordinates
		// 	})
		// }