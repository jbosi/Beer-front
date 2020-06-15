import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { MatDialog } from '@angular/material/dialog';
import { BarPropertiesService } from '../../../services/';
import { IBarProperties } from '../../../models/';
import { MapPopupComponent } from '../map-popup';

import * as L from 'leaflet';
import 'leaflet.markercluster';

declare var require: any;
const lightRedMarker: string = require('./../../../../icons/markers/marker-light-red.svg');
const blueMarker: string = require('./../../../../icons/markers/marker-blue.svg');
const customMarker: string = require('./../../../../icons/markers/custom-marker.svg');

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
	public markers: L.Layer[] = [];
	private map: any;

	private cluster = L.markerClusterGroup({
		showCoverageOnHover: false,
		disableClusteringAtZoom: 18,
		maxClusterRadius: 100
	});
	
	@Input() data: IBarProperties[];

	constructor(
		private barPropertiesService: BarPropertiesService,
		public dialog: MatDialog,
		private cd: ChangeDetectorRef,
	) { }

	ngAfterViewInit(): void {
		this.initMap();

		const tiles = L.tileLayer('https://tile.jawg.io/366c861a-b654-449a-b232-3c6a14acece4/{z}/{x}/{y}.png?access-token=cANBjZRijJpZ3Pr0KrNMhgJxUoLUeTcK59EGJtlRK5YeT6nThxJac1GUCocmaKPP', {
			maxZoom: 20,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>'
		});
		tiles.addTo(this.map);

		this.addMarkers();
		this.map.locate({setView: true, maxZoom: 15});
		this.map.on('locationfound', (e: any) => this.onLocationFound(e));
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
		// const iconId = changes.iconChangeId;
		// if (iconId.currentValue != iconId.previousValue) {
			// 	this.changeIconColor(iconId.currentValue, true);
			// 	this.centerLeafletMapOnMarker(iconId.currentValue);
			// }
			// if (iconId.previousValue != null) {
				// 	this.changeIconColor(iconId.previousValue, false);
				// }
		const dataChange = changes.data;
		if (dataChange.currentValue != dataChange.previousValue && dataChange.previousValue !== undefined) {
			this.onDataChange();
		}
	}
	
	// public changeIconColor(id: number, isSelected?: boolean) {
	// 	const icon = L.icon({
	// 		iconUrl: isSelected ? lightRedMarker : blueMarker,
	// 		iconSize: [25, 45],
	// 		iconAnchor: [12, 44],
	// 		popupAnchor: [1, -45],
	// 	});

	// 	const marker = this.markers.find(marker => marker.bar.id === id);
	// 	marker.setIcon(icon);
	// }
	
	// private centerLeafletMapOnMarker(id: number) {
	// 	const marker = this.markers.find(marker => marker.bar.id === id)
	// 	this.map.setView(marker.getLatLng(), 14);
	// }
	
	private addMarkers(): void {
		const icon = L.icon({
			iconUrl: customMarker,
			iconSize: [25, 45],
			iconAnchor: [13, 46],
			popupAnchor: [1, -45],
		});

		this.data.map((bar: IBarProperties) => {
			const cheapestBeer = bar.cheapestBeer ? bar.cheapestBeer.toString() : 'NA';
			const marker: any = L.marker([bar.location.latitude, bar.location.longitude], {
				icon: icon,
			})
			// .on('click', (e) => this.router.navigate([bar.id], {relativeTo: this.activatedRoute}))
			.bindTooltip(cheapestBeer, {
				permanent: true,
				direction: 'center',
				offset: [0,27],
				className: 'map-marker-tooltip-price'
			})

			.bindPopup(() => {	
				const popupEl: NgElement & WithProperties<MapPopupComponent> = document.createElement('popup-element') as any;
				// Listen to the close event
				popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

				popupEl.barData$ = this.barPropertiesService.getBarPropertiesById(bar.id);
				
				document.body.appendChild(popupEl);
				return popupEl;
			})
			
			marker.bar = bar;
			
			this.markers.push(marker);
		})
		
		this.cluster.addLayers(this.markers);
		this.map.addLayer(this.cluster);
	}

	private onDataChange() {
		this.removeMarkers(); // TODO remove only filtered markers
		this.markers = [];
		this.addMarkers();
	}
		
	private removeMarkers(): void {
		this.cluster.clearLayers();
	}

	private onLocationFound(e: any) {
		var radius = e.accuracy / 2;
		L.circle(e.latlng, radius).addTo(this.map);
	}
}