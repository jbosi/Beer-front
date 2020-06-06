import { Component, OnInit, Input } from '@angular/core';
import { IBarProperties, IDetailedBarProperties, IBeerInfo } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

declare var require: any;
const blondBeerIcon = require('./../../../../icons/beers/beer-blond.png')

@Component({
	selector: 'app-map-popup',
	templateUrl: './map-popup.component.html',
	styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements OnInit {
	@Input() public barData$: Observable<any>;
	public dataSource: IBarBeerDetail[] = [];
	public barName: string;
	public displayedColumns: string[] = ['name', 'price', 'priceHH', 'icon', 'quantity'];
	public isLoading = true;
	
	ngOnInit() {
		this.barData$.subscribe(bar => {
			this.barName = bar.name;
			bar.beers.map(beer => {
				beer.pricing.map(item => {
					this.dataSource.push({
						name: beer.name,
						price: item.priceBeer,
						priceHH: item.priceHappy,
						icon: blondBeerIcon,
						quantity: item.volume + ' cl'
					});
				});
			});
			this.isLoading = false;
		})
	}
	
}

export interface IBarBeerDetail {
	name: string;
	price: number;
	priceHH: number;
	icon: string;
	quantity: string;
}