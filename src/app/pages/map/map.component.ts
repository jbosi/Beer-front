import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { IBarProperties, IFavoriteBar, IBarNames } from '@beer/models';
import { AuthenticationService, UserService } from '@beer/services';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	public isMobile: boolean;
	public barProperties: IBarProperties[];
	public highlightedMarkerId = new Subject<string>();
	public showFilters = false;
	public barNames: IBarNames[] = [];
	private isLogged = false;
	public favorites: IFavoriteBar[] = [];
	public favorites$: Observable<IFavoriteBar[]>;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly authenticationService: AuthenticationService,
		private readonly userService: UserService,
		private readonly snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;

		this.authenticationService.isLogged.subscribe(isLogged => this.isLogged = isLogged);

		this.activatedRoute.data.subscribe((response: { mapData: IBarProperties[] }) => {
			this.barProperties = response.mapData;
			this.barNames = this.barProperties.map(bar => {
				return {
					name: bar.name,
					id: bar.id
				};
			});
		});

		this.favorites$ = this.getfavorites();
		this.favorites$.subscribe(favorites => this.favorites = favorites);
	}

	public getIsMobile(): boolean {
		return this.isMobile;
	}

	public toggleShowFilters(): void {
		this.showFilters = !this.showFilters;
	}

	public onSelectedItemChanged(bar: IBarNames): void {
		if (bar != null && bar.id) {
			if (this.barProperties.some(item => item.id === bar.id)) {
				this.highlightedMarkerId.next(bar.id);
				return;
			}
			this.snackBar.open('Veuillez Réinitialiser les filtres', '', {
				duration: 2000,
			});
		}
	}

	private getfavorites(): Observable<IFavoriteBar[]> {
		if (this.isLogged) {
			return this.userService.getfavoritesByUserId(localStorage.getItem('user_id'));
		}
		return of(null);
	}
}
