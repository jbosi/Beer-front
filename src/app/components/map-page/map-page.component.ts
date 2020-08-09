import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { IBarProperties, IFavoriteBar, IBarNames } from '../../models';
import { AuthenticationService, UserService } from '../../services';

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
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
		private readonly userService: UserService
	) {}
	
	ngOnInit() {
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
			this.highlightedMarkerId.next(bar.id);
		}
	}

  private getfavorites(): Observable<IFavoriteBar[]> {
		if (this.isLogged) {
			return this.userService.getfavoritesByUserId(localStorage.getItem('user_id'));
		}
		return of(null);
	}
}