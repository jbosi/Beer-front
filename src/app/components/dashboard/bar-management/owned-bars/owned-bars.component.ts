import { Component, OnInit } from '@angular/core';
import { IDetailedBarPropertiesView } from '../bar-management.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-owned-bars',
	templateUrl: './owned-bars.component.html',
	styleUrls: ['./owned-bars.component.scss']
})
export class OwnedBarsComponent implements OnInit {
	public ownedBars: IDetailedBarPropertiesView[] = [];

	constructor(
		private readonly activatedRoute: ActivatedRoute
	) { }
	
	ngOnInit() {
		this.activatedRoute.data.subscribe((data: { ownedBars: IDetailedBarPropertiesView[] }) => {
			this.ownedBars = data.ownedBars;
		});
	}
	
	public toggleExpand(index: number) {
		this.ownedBars[index].expand = !this.ownedBars[index].expand; 
	}
}
