import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarProperties } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { MapFiltersMobileComponent } from './map-filters-mobile';

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
	public isMobile: boolean;
	public barProperties: IBarProperties[];
	public dialogData: IBarProperties[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private modal: MatDialog
	) {}
	
	ngOnInit() {
		window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;
		
		this.activatedRoute.data.subscribe((response: {mapData: IBarProperties[]}) => {
			this.barProperties = response.mapData;
			this.dialogData = this.barProperties;
		});

	}

	public getIsMobile(): boolean {
		return this.isMobile;
	}

	public openModal() {
		this.modal.open(MapFiltersMobileComponent, {data: this.dialogData});
	}
}
