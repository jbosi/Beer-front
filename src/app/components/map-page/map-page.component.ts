import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarProperties } from 'src/app/models';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
	public isMobile: boolean;
	public barProperties: IBarProperties[];
	public barSearcher = new FormControl();
	public showFilters = false;

	constructor(
		private activatedRoute: ActivatedRoute,
	) {}
	
	ngOnInit() {
		window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;
		
		this.activatedRoute.data.subscribe((response: {mapData: IBarProperties[]}) => {
			this.barProperties = response.mapData;
		});

		this.barSearcher.valueChanges
	}

	public getIsMobile(): boolean {
		return this.isMobile;
	}

	public toggleShowFilters(): void {
		this.showFilters = !this.showFilters;
	}
}
