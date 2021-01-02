import { Component, OnInit, Input } from '@angular/core';
import { IBarBeerDetail, IDetailedBarProperties } from '../../../models';
import { BEER_ICON_TYPES_COLORS } from '../../../utils';
import { Observable, throwError } from 'rxjs';
import { BarPropertiesService } from '../../../services';

@Component({
	selector: '[app-beer-table]',
	templateUrl: './beer-table.component.html',
	styleUrls: ['./beer-table.component.scss']
})
export class BeerTableComponent implements OnInit {
	@Input() public bar: IDetailedBarProperties;
	@Input() public labelEmpty: string;
	@Input() public displayEditIcons = false;
	public displayedColumns: { id: string, name: string }[] = [
		{ id: 'name', name: 'BIERES'},
		{ id: 'price', name: '€'},
		{ id: 'priceHH', name: '€ (HH)'},
		{ id: 'icon', name: ''},
		{ id:  'quantity', name: 'Qte'}
	];
	public tableData: IBarBeerDetail[] = [];

	constructor(
		private readonly barService: BarPropertiesService
	) {}

	ngOnInit() {
		this.bar.beers.map(beer => {
			beer.pricing.map(item => {
				this.tableData.push({
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

	public onEditOrRemove(element): void | Observable<never> {
		if (element.user == null || element.bar == null) {
			return throwError('Oops, somethin went wrong');
		}
		// this.barService;
	}
}
