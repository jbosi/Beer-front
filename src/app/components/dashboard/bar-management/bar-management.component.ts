import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UserService, BarPropertiesService } from '../../../services';
import { IDetailedBarProperties, IBarBeerDetail } from '../../../models';

@Component({
	selector: 'app-bar-management',
	templateUrl: './bar-management.component.html',
	styleUrls: ['./bar-management.component.scss']
})
export class BarManagementComponent implements OnInit {
	private userId: string;
	public ownedBars: IDetailedBarPropertiesView[] = [];
	public ownershipRequests: any[] = [];
	public toggledOwnershipRequests: boolean;
	public barData: IDetailedBarProperties;
	
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
			ownerships.forEach(ownership => {
				this.barService.getBarPropertiesById(ownership.barId).subscribe(bar => {
					this.ownedBars.push({ ...bar, expand: false });
					this.barData = bar;
				});
			});
			
			ownershipRequests.forEach(request => {
				this.barService.getBarPropertiesById(request.barId).subscribe(bar => {
					this.ownershipRequests.push({ ...request, ...bar });
				});
			});
		});
	}

	public toggleExpand(index: number) {
		this.ownedBars[index].expand = !this.ownedBars[index].expand; 
	}

	public toggleOwnershipRequests(toggle: boolean): void {
		this.toggledOwnershipRequests = toggle;
	}
}

declare interface IDetailedBarPropertiesView extends IDetailedBarProperties {
	expand: boolean;
}