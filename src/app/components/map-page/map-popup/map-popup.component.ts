import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IDetailedBarProperties, IBarBeerDetail, IFavoriteBar } from '../../../models';
import { getCurrentDay, formatDateToHoursMinutes } from '../../../utils';
import { UserService } from '../../../services';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-map-popup',
	templateUrl: './map-popup.component.html',
	styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements OnInit {
	@Input() public barData$: Observable<any>;
	@Input() public favorites: IFavoriteBar[];

	private barId: string;
	public dataSource: IBarBeerDetail[] = [];
	public barName: string;
	public barAddress: string;
	public happyHourStart: string;
	public happyHourEnd: string;
	public displayedColumns: string[] = ['name', 'price', 'priceHH', 'icon', 'quantity'];
	public isLoading = true;
	public isFavorite: boolean;
	public barData: IDetailedBarProperties;

	constructor(
		private userService: UserService,
		private snackBar: MatSnackBar
	) {}
	
	ngOnInit() {
		const currentDay: string = getCurrentDay();
		this.barData$.subscribe((bar: IDetailedBarProperties) => {
			this.barData = bar;
			this.barName = bar.name;
			this.barAddress = bar.address;
			this.barId = bar.id;
			this.happyHourStart = formatDateToHoursMinutes(bar.happyHourTime[currentDay].start);
			this.happyHourEnd = formatDateToHoursMinutes(bar.happyHourTime[currentDay].end);
			if (this.happyHourStart === this.happyHourEnd) {
				this.happyHourStart = 'NA';
				this.happyHourEnd = 'NA';
			}
			this.isFavorite = this.checkIsFavorites();
			this.isLoading = false;
		});
	}

	public toggleIsFavorite(): void {
		if (!this.isFavorite) {
			this.userService.favorites(this.barId).subscribe(
				(_) => {
					this.isFavorite = !this.isFavorite;
					this.favorites.push({ barId: this.barId })
				},
				error => this.handleError(error)
			);
		}
		else {
			this.userService.unfavorites(this.barId).subscribe(
				(_) => {
					this.isFavorite = !this.isFavorite
					const index = this.favorites.findIndex(favorite => favorite.barId === this.barId);
					this.favorites.splice(index, 1);
				},
				error => this.handleError(error)
			);
		}
	}

	private handleError(error) {
		// this.loading = false;
		const message = error.error.message;
		if (error.error.keyError === 'missingToken') {
			this.snackBar.open('Veuillez vous connecter', '', {
				duration: 2000,
			});
		}
	}

	private checkIsFavorites(): boolean {
		if (this.favorites == null) {
			return false;
		}
		return this.favorites.some(bar => bar.barId === this.barId);
	}
}