import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ComponentFactoryResolver, Injector, ApplicationRef, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarPropertiesService } from '../../../services/';
import { barProperties } from '../../../models/';
import { BarPropertiesModalComponent } from '../../modals/';
import { NgElement, WithProperties } from '@angular/elements';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import { MapPopupComponent } from '../../map-popup';

declare var require: any;
const lightRedMarker: string = require('./../../../../icons/markers/marker-light-red.svg');
const blueMarker: string = require('./../../../../icons/markers/marker-blue.svg');
// const blueMarkerPng: string = require('./../../../../icons/markers/marker-blue.png');
const customMarker: string = require('./../../../../icons/markers/custom-marker.svg');

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
	public markers: any[] = [];
	private map: any;

	private cluster = L.markerClusterGroup({
		showCoverageOnHover: false,
		disableClusteringAtZoom: 18
	});
	
	@Input() iconChangeId: number;

	constructor(
		private markerService: BarPropertiesService,
		public dialog: MatDialog,
		private cd: ChangeDetectorRef,
	) { }

	ngAfterViewInit(): void {
		this.initMap();

		const tiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		tiles.addTo(this.map);

		this.addMarkers();
		this.map.locate({setView: true, maxZoom: 15});
		this.map.on('locationfound',(e: any) => this.onLocationFound(e));
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
			iconUrl: customMarker,
			iconSize: [25, 45],
			iconAnchor: [13, 46],
			popupAnchor: [1, -45],
		});
				
		this.markerService.getMarkers().subscribe((bars: barProperties[]) => {
			bars.map((bar: barProperties) => {
				const marker: any = L.marker(bar.coordinates, {
					icon: icon,
				})
				// .on('click', (e) => this.onMarkerClick(e, this));
				.bindTooltip(bar.minPrice.toString(), {
					permanent: true,
					direction: 'center',
					offset: [0,27],
					className: 'map-marker-tooltip-price'
				})

				.bindPopup(() => {	
					const popupEl: NgElement & WithProperties<MapPopupComponent> = document.createElement('popup-element') as any;
					// Listen to the close event
					popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
					popupEl.barData = bar
					// Add to the DOM
					document.body.appendChild(popupEl);
					return popupEl;
				})
				
				marker.bar = bar;
				
				this.markers.push(marker);
				this.cluster.addLayer(marker)

			})
		})
		
		this.map.addLayer(this.cluster)
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

	private onLocationFound(e: any) {
		var radius = e.accuracy / 2;
		L.circle(e.latlng, radius).addTo(this.map);
	}
}