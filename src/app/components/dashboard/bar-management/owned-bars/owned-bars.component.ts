import { Component, OnInit } from '@angular/core';
import { IDetailedBarPropertiesView } from '../bar-management.component';
import { IOwnershipResponse } from '../../../../models';
import { UserService } from '../../../../services';

@Component({
	selector: 'app-owned-bars',
	templateUrl: './owned-bars.component.html',
	styleUrls: ['./owned-bars.component.scss']
})
export class OwnedBarsComponent implements OnInit {
	public ownedBars: IDetailedBarPropertiesView[] = [];

	constructor(
		private readonly userService: UserService
	) { }
	
	ngOnInit() {
		const userId = localStorage.getItem('user_id');
		this.userService.getAllOwnershipByUserId(userId).subscribe((ownedBars: IOwnershipResponse[] ) => {
			this.ownedBars = ownedBars.map(ownedBar => {
				return {
					...ownedBar.bar,
					expand: false
				}
			});
		});
	}
	
	public toggleExpand(index: number) {
		this.ownedBars[index].expand = !this.ownedBars[index].expand; 
	}
}
