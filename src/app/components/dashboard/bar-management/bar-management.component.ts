import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { IDetailedBarProperties } from '../../../models';

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
		private readonly snackBar: MatSnackBar,
	) { }
	
	ngOnInit() {
		this.userId = localStorage.getItem('user_id');
		if (this.userId == null) {
			return this.snackBar.open('Erreur, veuillez vous reconnecter', '', {
				duration: 2000,
			});
		}
	}

	public toggleOwnershipRequests(toggle: boolean): void {
		this.toggledOwnershipRequests = toggle;
	}
}

export interface IDetailedBarPropertiesView extends IDetailedBarProperties {
	expand: boolean;
}