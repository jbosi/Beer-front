import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UserService, BarPropertiesService } from '../../../services';
import { IDetailedBarProperties, IBarBeerDetail } from '../../../models';
import { BEER_ICON_TYPES_COLORS } from '../../../utils';

@Component({
	selector: 'app-bar-management',
	templateUrl: './bar-management.component.html',
	styleUrls: ['./bar-management.component.scss']
})
export class BarManagementComponent implements OnInit {
	private userId: string;
	public ownedBars: IDetailedBarPropertiesView[] = [];
	public ownershipRequests: any;
	public dataSource: IBarBeerDetail[] = [];
	public displayedColumns: string[] = ['name', 'price', 'priceHH', 'icon', 'quantity'];
	public toggledOwnershipRequests: boolean;
	
	constructor(
		private readonly userService: UserService,
		private readonly snackBar: MatSnackBar,
		private readonly barService: BarPropertiesService
	) { }
	
	ngOnInit() {
		this.userId = localStorage.getItem('user_id');
		if (this.userId == null) {
			return this.snackBar.open('Erreur, veuillez vous reconnecter', '', {
				duration: 2000,
			});
		}
		zip(
			this.userService.getAllOwnershipByUserId(this.userId),
			this.userService.getAllOwnershipRequestsByUserId(this.userId)
		).subscribe(([ownerships, ownershipRequests]) => {
			console.log(ownershipRequests, ownerships)
			ownerships.forEach(ownership => {
				this.barService.getBarPropertiesById(ownership.barId).subscribe(bar => {
					this.ownedBars.push({ ...bar, expand: false });
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
				});
			});

			this.ownershipRequests = ownershipRequests;
		});
	}

	private getBeerIconColor(type: string): string {
		return BEER_ICON_TYPES_COLORS[type] || '#FFFFFF';
	}

	public toggleExpand(index: number) {
		this.ownedBars[index].expand = !this.ownedBars[index].expand; 
	}

	public toggleOwnershipRequests(): void {
		this.ownershipRequests = !this.ownershipRequests;
	}
}

declare interface IDetailedBarPropertiesView extends IDetailedBarProperties {
	expand: boolean;
}