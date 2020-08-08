import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarProperties } from 'src/app/models';
import { Observable, Subject } from 'rxjs';
import { MatOption } from '@angular/material';

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
	public isMobile: boolean;
	public barProperties: IBarProperties[];
	public highlightedMarkerId = new Subject<string>();
	public showFilters = false;
	public barNames: IBarNames[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
	) {}
	
	ngOnInit() {
		window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;
		
		this.activatedRoute.data.subscribe((response: { mapData: IBarProperties[] }) => {
			this.barProperties = response.mapData;
			this.barNames = this.barProperties.map(bar => {
				return {
					name: bar.name,
					id: bar.id
				};
			});
		});
	}

	public getIsMobile(): boolean {
		return this.isMobile;
	}

	public toggleShowFilters(): void {
		this.showFilters = !this.showFilters;
	}

	public onSelectedItemChanged(id: string) {
		console.log(id)
		this.highlightedMarkerId.next(id);
	}
}

export interface IBarNames {
	name: string;
	id: string;
}