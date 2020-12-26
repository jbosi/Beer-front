import { Component, OnInit } from '@angular/core';
import { BeerPropertiesService } from '../../services';
import { IBeerInfo } from '../../models';
@Component({
	selector: 'app-beer-list',
	templateUrl: './beer-list.component.html',
	styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
	public beers: IBeerInfo[] = [];
	public isLoading = false;
	public offset = 0;

	constructor(
		private beersService: BeerPropertiesService
	) { }

	ngOnInit(): void {
		this.fetchData();
	}

	public onScroll(): void {
		this.fetchData();
	}

	private fetchData() {
		this.isLoading = true;
		this.beersService.getBeers(this.offset).subscribe((beers) => {
			this.beers = [...this.beers.concat(beers)];
			this.offset += 20;
			this.isLoading = false;
		});
	}
}
