import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BarPropertiesService, BeerPropertiesService } from '../../../services';
import { IBarProperties } from '../../../models';
import { BEER_ICON_TYPES } from '../../../utils';

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
	@Output() public dataChange = new EventEmitter<IBarProperties[]>();
	@Output() public showFiltersChange = new EventEmitter<Boolean>();

	public form: FormGroup;
	private filters = {};
	private previousResponse: IBarProperties[] = [];
	private allData: IBarProperties[];
	private backFiltersChanged = false;
	public beerTypes = BEER_ICON_TYPES;
	public beerNames: string[] = [];

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly barService: BarPropertiesService,
		private readonly beerService: BeerPropertiesService
	) {	}

	ngOnInit() {
		this.allData = [...this.data];

		this.form = this.formBuilder.group({
			isOpened: null,
			isHappyHour: null,
			price: 10,
			type: null,
			hasTerrace: null
		});

		this.form.valueChanges.pipe(
			debounceTime(350),
			distinctUntilChanged()
		).subscribe((model) => {
			this.onFormChange(model);
		});

		this.beerService.getBeerNames().subscribe(names => this.beerNames = names);
	}

	private onFormChange(model: any): void {
		this.getFilteredData(model).subscribe(data => this.dataChange.emit(data));
	}

	private getFilteredData(model): Observable<IBarProperties[]> {
		const filteredData = [...this.allData];
		const priceField = this.form.get('price');
		const beerTypeField = this.form.get('type');
		const hasTerraceField = this.form.get('hasTerrace');

		if (priceField.dirty) {
			this.filters['price'] = model['price'];
			priceField.markAsPristine();
			this.backFiltersChanged = true;
		}

		if (hasTerraceField.dirty) {
			model['hasTerrace'] ? this.filters['tag'] = 'Terrasse' : delete this.filters['tag'];
			hasTerraceField.markAsPristine();
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
    
		if (!this.backFiltersChanged && this.previousResponse != null) {
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
		if (model.isOpened) {
			filteredData = filteredData.filter(bar => bar.opened);
		}
		if (model.isHappyHour) {
			filteredData = filteredData.filter(bar => bar.inHappy);
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
}
