import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IDetailedBarProperties, IBarBeerDetail } from '../../../models';
import { getCurrentDay, formatDateToHoursMinutes, BEER_ICON_TYPES_COLORS } from '../../../utils';

@Component({
	selector: 'app-map-popup',
	templateUrl: './map-popup.component.html',
	styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements OnInit {
	@Input() public barData$: Observable<any>;
	public dataSource: IBarBeerDetail[] = [];
	public barName: string;
	public barAddress: string;
	public happyHourStart: string;
	public happyHourEnd: string;
	public displayedColumns: string[] = ['name', 'price', 'priceHH', 'icon', 'quantity'];
	public isLoading = true;
	public isFavorite: boolean;
	
	ngOnInit() {
		const currentDay: string = getCurrentDay();
		this.barData$.subscribe((bar: IDetailedBarProperties) => {
			this.barName = bar.name;
			this.barAddress = bar.address;
			this.happyHourStart = formatDateToHoursMinutes(bar.happyHourTime[currentDay].start);
			this.happyHourEnd = formatDateToHoursMinutes(bar.happyHourTime[currentDay].end);
			if (this.happyHourStart === this.happyHourEnd) {
				this.happyHourStart = 'NA';
				this.happyHourEnd = 'NA';
			}
			bar.beers.map(beer => {
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
			this.isLoading = false;
		})
	}

	private getBeerIconColor(type: string): string {
		return BEER_ICON_TYPES_COLORS[type] || '#FFFFFF';
	}

	public toggleIsFavorite(): void {
		this.isFavorite = !this.isFavorite;
	}
}