import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BarPropertiesService } from 'src/app/services/bar-properties.service';
import { barProperties } from '../../../models/bar-properties.model';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
	private map: any;
	
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
			iconUrl: 'marker-icon.png',
			iconSize: [25, 45],
			iconAnchor: [12, 44],
		});

		this.markerService.getMarkers().subscribe((bars: barProperties[]) => {
			bars.map((bar: barProperties) => {
				L.marker([bar.coord.lat, bar.coord.lon], {icon: icon}).addTo(this.map);
			})
		})
	}
}