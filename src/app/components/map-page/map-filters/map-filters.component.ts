import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BarPropertiesService, BeerPropertiesService, AuthenticationService } from '../../../services';
import { IBarProperties, IFavoriteBar } from '../../../models';
import { BEER_ICON_TYPES } from '../../../utils';
import { MatSnackBar } from '@angular/material';

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
	@Output() public showFiltersChange = new EventEmitter<Boolean>();

	public form: FormGroup;
	private filters = {};
	private previousResponse: IBarProperties[] = [];
	private allData: IBarProperties[];
	private backFiltersChanged = false;
	public beerTypes = BEER_ICON_TYPES;
	public isLogged: boolean;
	public beerNames: string[] = [];
	public isShowfavoritesChecked: boolean = false;

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
		const priceField = this.form.get('price');
		const beerTypeField = this.form.get('type');

		if (priceField.dirty) {
			this.filters['price'] = model['price'];
			priceField.markAsPristine();
			this.backFiltersChanged = true;
		}

		if (beerTypeField.dirty) {
			this.filters['type'] = model['type'];
			beerTypeField.markAsPristine();
			this.backFiltersChanged = true;
			if (model['type'] === undefined) {
				delete this.filters['type'];
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
		if (this.filters['isOpened']) {
			filteredData = filteredData.filter(bar => bar.opened);
		}
		if (this.filters['isHappyHour']) {
			filteredData = filteredData.filter(bar => bar.inHappy);
		}
		if (this.filters['showfavorites']) {
			if (!this.isLogged) {
				this.isShowfavoritesChecked = false;
				this.snackBar.open('Veuillez vous connecter', '', {
					duration: 2000,
				});
			}
			else if (this.favorites != null) {
				filteredData = filteredData.filter(bar => this.favorites.some(favorite => favorite.barId === bar.id));
			}
		}
		return filteredData;
	}

	private processFilters(filters): string {
		let result = '';
		for (let filter in filters) {
			result += `${filter}=${filters[filter]}&`
		}
		return result.slice(0, -1);
	}

	public toggleShowFilters(): void {
		this.showFilters = !this.showFilters;
		this.showFiltersChange.emit(this.showFilters);
	}

	public onSelectedItemChanged(beerName: string) {
		if (beerName != null) {
			this.filters['beer'] = beerName;
		}
		else {
			delete this.filters['beer'];
		}
		this.backFiltersChanged = true;
		this.form.updateValueAndValidity();
	}

	public onValueChange($event) {
		if ($event.target.value === 'hasTerrace') {
			$event.target.checked ? this.filters['tag'] = 'Terrasse' : delete this.filters['tag'];
		}
		this.filters[$event.target.value] = $event.target.checked;
		this.backFiltersChanged = true;
		this.form.updateValueAndValidity();
	}
}
