import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { BarPropertiesService } from 'src/app/services/bar-properties.service';
import { barProperties } from '../../../models/bar-properties.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
	private map: any;
	public markers: any[] = [];

	@Input() iconChangeId: number;
	
	constructor(
		private markerService: BarPropertiesService, 
	) { }
		
	ngAfterViewInit(): void {
		this.initMap();
		
		const tiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		tiles.addTo(this.map);
		
		this.addMarkers();
	}

	ngOnChanges(changes: SimpleChanges): void {
		const iconId = changes.iconChangeId;
		if (iconId.currentValue != iconId.previousValue) {
			this.changeIconColor(iconId.currentValue, true);
			this.centerLeafletMapOnMarker(iconId.currentValue);
		}
		if (iconId.previousValue != null) {
			this.changeIconColor(iconId.previousValue, false);
		}
	}

	private changeIconColor(id: number, isSelected: boolean) {
		const icon = L.icon({
			iconUrl: isSelected ? 'marker-light-red.svg' : 'marker-blue.svg',
			iconSize: [25, 45],
			iconAnchor: [12, 44],
			popupAnchor: [1, -45],
		});
		const marker = this.markers.find(marker => marker.id === id);
		marker.setIcon(icon);
	}

	private centerLeafletMapOnMarker(id: number) {
		const marker = this.markers.find(marker => marker.id === id)
		this.map.setView(marker.getLatLng(), 14);
	}
	
	private initMap(): void {
		this.map = L.map('map', {
			zoomControl: false,
			center: [ 48.8534, 2.3488 ],
			zoom: 14
		});

		L.control.zoom({
			position:'topright'
	   }).addTo(this.map);
	}

	
	private addMarkers(): void {
		const icon = L.icon({
			iconUrl: 'marker-blue.svg',
			iconSize: [25, 45],
			iconAnchor: [12, 44],
			popupAnchor: [1, -45],
		});

		this.markerService.getMarkers().subscribe((bars: barProperties[]) => {
			bars.map((bar: barProperties) => {
				const marker = L.marker([bar.coord.lat, bar.coord.lon], {
					icon: icon,
				})
				.addTo(this.map)
				.bindPopup(bar.name);

				marker.id = bar.id;

				this.markers.push(marker);
			})
		})
	}
}