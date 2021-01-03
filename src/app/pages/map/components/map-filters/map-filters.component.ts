import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBarProperties, IFavoriteBar } from '@beer/models';
import { AuthenticationService, BarPropertiesService, BeerPropertiesService } from '@beer/services';
import { BEER_ICON_TYPES } from '@beer/utils';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-map-filters',
	templateUrl: './map-filters.component.html',
	styleUrls: ['./map-filters.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MapFiltersComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => MapFiltersComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFiltersComponent implements OnInit {
	@Input() public data: IBarProperties[] = [];

	@Input() public isMobile: boolean;
	@Input() public showFilters: boolean;
	@Input() public favorites: IFavoriteBar[] = [];
	@Output() public dataChange = new EventEmitter<IBarProperties[]>();
	@Output() public showFiltersChange = new EventEmitter<boolean>();

	public form: FormGroup;
	private filters = {};
	private previousResponse: IBarProperties[] = [];
	private allData: IBarProperties[];
	private backFiltersChanged = false;
	public beerTypes = BEER_ICON_TYPES;
	public isLogged: boolean;
	public beerNames: string[] = [];
	public isShowfavoritesChecked = false;

	private readonly priceFilter = 'price';
	private readonly typeFilter = 'type';
	private readonly isHHFilter = 'isHappyHour';
	private readonly isOpenedFilter = 'isOpened';
	private readonly showfavoritesFilter = 'showfavorites';
	private readonly beerFilter = 'beer';
	private readonly tagFilter = 'tag';

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly barService: BarPropertiesService,
		private readonly snackBar: MatSnackBar,
		private readonly authenticationService: AuthenticationService,
		private readonly beerService: BeerPropertiesService
	) {	}

	ngOnInit() {
		this.allData = [...this.data];

		this.form = this.formBuilder.group({
			isOpened: null,
			isHappyHour: null,
			price: 10,
			showfavorites: null,
			type: null,
			hasTerrace: null
		});

		this.form.valueChanges.pipe(
			debounceTime(350),
			distinctUntilChanged()
		).subscribe(model => this.onFormChange(model));

		this.authenticationService.isLogged.subscribe(isLogged => this.isLogged = isLogged);

		this.beerService.getBeerNames().subscribe(names => this.beerNames = names);
	}

	private onFormChange(model: any): void {
		this.getFilteredData(model).subscribe(data => this.dataChange.emit(data));
	}

	private getFilteredData(model): Observable<IBarProperties[]> {
		const filteredData = [...this.allData];
		const priceField = this.form.get(this.priceFilter);
		const beerTypeField = this.form.get(this.typeFilter);

		if (priceField.dirty) {
			this.filters[this.priceFilter] = model[this.priceFilter];
			priceField.markAsPristine();
			this.backFiltersChanged = true;
		}

		if (beerTypeField.dirty) {
			this.filters[this.typeFilter] = model[this.typeFilter];
			beerTypeField.markAsPristine();
			this.backFiltersChanged = true;
			if (model[this.typeFilter] === undefined) {
				delete this.filters[this.typeFilter];
			}
		}

		if (!this.backFiltersChanged && this.previousResponse != null && this.previousResponse.length) {
			return of(this.addFrontFilters(model, this.previousResponse));
		}

		if (Object.keys(this.filters).length !== 0) {
			return this.barService.getFilteredBarsProperties(this.processFilters(this.filters)).pipe(
				tap(response => this.previousResponse = response),
				map(response => this.addFrontFilters(model, [...response]))
			);
		}

		this.backFiltersChanged = false;

		return of(this.addFrontFilters(model, filteredData));
	}

	private addFrontFilters(model, filteredData: IBarProperties[]): IBarProperties[] {
		if (this.filters[this.isOpenedFilter]) {
			filteredData = filteredData.filter(bar => bar.opened);
		}
		if (this.filters[this.isHHFilter]) {
			filteredData = filteredData.filter(bar => bar.inHappy);
		}
		if (this.filters[this.showfavoritesFilter]) {
			if (!this.isLogged) {
				this.isShowfavoritesChecked = false;
				this.snackBar.open('Veuillez vous connecter', '', {
					duration: 2000,
				});
			} else if (this.favorites != null) {
				filteredData = filteredData.filter(bar => this.favorites.some(favorite => favorite.barId === bar.id));
			}
		}
		return filteredData;
	}

	private processFilters(filters): string {
		let result = '';
		for (const filter in filters) {
			if (filters.hasOwnProperty(filter)) {
				result += `${filter}=${filters[filter]}&`;
			}
		}
		return result.slice(0, -1);
	}

	public toggleShowFilters(): void {
		this.showFilters = !this.showFilters;
		this.showFiltersChange.emit(this.showFilters);
	}

	public onSelectedItemChanged(beerName: string): void {
		if (beerName != null) {
			this.filters[this.beerFilter] = beerName;
		} else {
			delete this.filters[this.beerFilter];
		}
		this.backFiltersChanged = true;
		this.form.updateValueAndValidity();
	}

	public onValueChange($event): void {
		if ($event.target.value === 'hasTerrace') {
			$event.target.checked ? this.filters[this.tagFilter] = 'Terrasse' : delete this.filters[this.tagFilter];
		}
		this.filters[$event.target.value] = $event.target.checked;
		this.backFiltersChanged = true;
		this.form.updateValueAndValidity();
	}
}
