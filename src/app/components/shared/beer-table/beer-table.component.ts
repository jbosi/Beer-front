import { Component, OnInit, Input } from '@angular/core';
import { IBarBeerDetail, IDetailedBarProperties } from '../../../models';
import { BEER_ICON_TYPES_COLORS } from '../../../utils';

@Component({
	selector: '[app-beer-table]',
	templateUrl: './beer-table.component.html',
	styleUrls: ['./beer-table.component.scss']
})
export class BeerTableComponent implements OnInit {
	@Input() public bar: IDetailedBarProperties;
	@Input() public labelEmpty: string;
	public displayedColumns: string[] = ['name', 'price', 'priceHH', 'icon', 'quantity'];
	public dataSource: IBarBeerDetail[] = [];

	ngOnInit() {
		this.bar.beers.map(beer => {
			beer.pricing.map(item => {
				this.dataSource.push({
					name: beer.name,
					price: item.priceBeer,
					priceHH: item.priceHappy,
					icon: this.getBeerIconColor(beer.type),
					quantity: item.volume + ' cl'
				});
			});
		});
	}

	private getBeerIconColor(type: string): string {
		return BEER_ICON_TYPES_COLORS[type] || '#FFFFFF';
	}
}
