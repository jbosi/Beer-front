import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IDetailedBarProperties } from 'src/app/models';

const beerIconColors = {
	blond: '#EECC60',
	fruity: '#DA686F',
	brown: '#622F0A',
	white: '#D9D9D9',
	amber: '#A76B12'
}

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
	
	ngOnInit() {
		const currentDay: string = this.getCurrentDay();
		this.barData$.subscribe((bar: IDetailedBarProperties) => {
			this.barName = bar.name;
			this.barAddress = bar.address;
			this.happyHourStart = this.formatDate(bar.happyHourTime[currentDay].opening);
			this.happyHourEnd = this.formatDate(bar.happyHourTime[currentDay].closing);
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
		return beerIconColors[type] || '#EECC60';
	}

	private formatDate(date: Date): string {
		if (date == null) {
			return 'NA';
		}
		return `${date.getHours()}:${date.getMinutes()}`;
	}

	private getCurrentDay(): string {
		const currentDay = new Date().getDay();
		switch (currentDay) {
			case 1: {
				return 'monday';
			}
			case 2: {
				return 'thusday';
			}
			case 3: {
				return 'wednesday';
			}
			case 4: {
				return 'thursday';
			}
			case 5: {
				return 'friday';
			}
			case 6: {
				return 'saturday';
			}
			case 7: {
				return 'sunday';
			}
		
		}
	}
	
}

export interface IBarBeerDetail {
	name: string;
	price: number;
	priceHH: number;
	icon: string;
	quantity: string;
}