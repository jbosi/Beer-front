import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BarPropertiesService } from '../../../services/';
import { IBarProperties, IFavoriteBar } from '../../../models/';
import { MapPopupComponent } from '../map-popup';

import * as L from 'leaflet';
import 'leaflet.markercluster';

const clustersDiabledZoom = 18;

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
	@Input() public favorites: IFavoriteBar[];
	public markers: IMarker[] = [];
	private map: L.Map;
	private highlight: IMarker = null;

	private cluster = L.markerClusterGroup({
		showCoverageOnHover: false,
		spiderfyOnMaxZoom: false,
		disableClusteringAtZoom: clustersDiabledZoom,
		maxClusterRadius: 100,
		chunkedLoading: true
	});

	@Input() data: IBarProperties[];
	@Input() highlightedMarkerId: Subject<string>;

	constructor(
		private readonly barPropertiesService: BarPropertiesService,
		public dialog: MatDialog,
	) { }

	ngAfterViewInit(): void {
		this.initMap();
		this.highlightedMarkerId.subscribe(markerId => {
			const marker = this.markers.find(m => m.id == markerId);
			marker.setStyle(this.getHighlightOptions());
			this.highlight = marker;
			this.map.flyTo(marker.getLatLng(), this.map.getZoom() < clustersDiabledZoom ? clustersDiabledZoom : this.map.getZoom());
		});

		const tiles = L.tileLayer(`https://tile.jawg.io/366c861a-b654-449a-b232-3c6a14acece4/{z}/{x}/{y}.png?
			access-token=cANBjZRijJpZ3Pr0KrNMhgJxUoLUeTcK59EGJtlRK5YeT6nThxJac1GUCocmaKPP`, {
			maxZoom: 20,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>'
		});
		tiles.addTo(this.map);

		this.addMarkers();
		this.map
			.locate({setView: true, maxZoom: 15})
			.on('locationfound', (e: any) => this.onLocationFound(e))
			.on('click', () => this.highlight ? this.removeHighlight() : null);
	}

	ngOnChanges(changes: SimpleChanges): void {
		const dataChange = changes.data;
		if (dataChange != null && dataChange.currentValue != dataChange.previousValue && dataChange.previousValue !== undefined) {
			this.onDataChange();
		}
	}

	private initMap(): void {
		this.map = L.map('map', {
			zoomControl: false,
			center: [ 48.8534, 2.3488 ],
			zoom: 14,
			preferCanvas: true
		});
		L.control.zoom({
			position: 'topright'
		}).addTo(this.map);
	}

	private addMarkers(): void {
		this.data.map((bar: IBarProperties) => {
			const cheapestBeer = bar.cheapestBeer ? bar.cheapestBeer.toString() : 'NA';
			const marker: IMarker = L.circleMarker([bar.location.latitude, bar.location.longitude], this.getDefaultOptions())
			.on('click', (e) => {
				this.removeHighlight();
				marker.setStyle(this.getHighlightOptions());
				this.highlight = marker;

				const targetPoint = this.map.project(e.target.getLatLng(), this.map.getZoom()).subtract([0, 200]);
				const targetLatLng = this.map.unproject(targetPoint, this.map.getZoom());
				this.map.flyTo(targetLatLng, this.map.getZoom());
			})
			.bindTooltip(cheapestBeer, {
				permanent: true,
				direction: 'center',
				className: 'map-marker-tooltip-price'
			}).bindPopup(() => {
				const popupEl: NgElement & WithProperties<MapPopupComponent> = document.createElement('popup-element') as any;
				// Listen to the close event
				popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

				popupEl.barData$ = this.barPropertiesService.getBarPropertiesById(bar.id);
				popupEl.favorites = this.favorites;

				document.body.appendChild(popupEl);
				return popupEl;
			});

			marker.id = bar.id;
			this.markers.push(marker);
		});

		this.cluster.addLayers(this.markers);
		this.map.addLayer(this.cluster);
	}

	private onDataChange(): void {
		this.removeMarkers(); // TODO remove only filtered markers
		this.markers = [];
		this.addMarkers();
	}

	private removeMarkers(): void {
		this.cluster.clearLayers();
	}

	private onLocationFound(e: any): void { // TODO improve
		const radius = e.accuracy / 2;
		L.circle(e.latlng, radius).addTo(this.map);
	}

	private removeHighlight(): void {
		if (this.highlight !== null) {
			this.highlight.setStyle(this.getDefaultOptions());
			this.highlight = null;
		}
	}

	private getHighlightOptions(): L.CircleMarkerOptions {
		return {
			fillColor: '#DA686F',
			color: '#DA686F',
			fillOpacity: 1
		};
	}

	private getDefaultOptions(): L.CircleMarkerOptions {
		return {
			fillColor: '#5C9CE6',
			color: '#5C9CE6',
			fillOpacity: 1
		};
	}
}

export interface IMarker extends L.CircleMarker {
	id?: string;
}
