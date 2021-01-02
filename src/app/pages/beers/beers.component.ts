import { Component, OnInit } from '@angular/core';
import { BeerPropertiesService } from '@beer/services';
import { IBeerInfo } from '@beer/models';
@Component({
	selector: 'app-beers',
	templateUrl: './beers.component.html',
	styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
	public beers: IBeerInfo[] = [];
	public isLoading = false;
	public offset = 0;

	constructor(
		private readonly beersService: BeerPropertiesService
	) { }

	ngOnInit(): void {
		this.fetchData();
	}

	public onScroll(): void {
		this.fetchData();
	}

	private fetchData(): void {
		this.isLoading = true;
		this.beersService.getBeers(this.offset).subscribe((beers) => {
			this.beers = [...this.beers.concat(beers)];
			this.offset += 20;
			this.isLoading = false;
		});
	}
}
