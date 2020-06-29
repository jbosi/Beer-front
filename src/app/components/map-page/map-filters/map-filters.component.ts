import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { IBarProperties } from '../../../models';
import { BarPropertiesService } from 'src/app/services';
import { Observable, of } from 'rxjs';

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
	@Output() public dataChange = new EventEmitter<IBarProperties[]>();

	public form: FormGroup;
	private filters = {};
	private previousResponse: IBarProperties[];
	private allData: IBarProperties[];

	constructor(
		private formBuilder: FormBuilder,
		private barService: BarPropertiesService
	) {	}

	ngOnInit() {
		this.allData = [...this.data];
		this.form = this.formBuilder.group({
			isOpened: undefined,
			containsBeer: undefined,
			isHappyHour: undefined,
			price: undefined
		});

		this.form.valueChanges.pipe(
			debounceTime(350),
			distinctUntilChanged()
		).subscribe((model) => {
			this.onFormChange(model);
		});
	}

	private onFormChange(model: any): void {
		this.getFilteredData(model).subscribe(data => this.dataChange.emit(data));
	}

	private addFrontFilters(model, filteredData: IBarProperties[]): IBarProperties[] {
		if (model.opened) {
			filteredData = filteredData.filter(bar => bar.opened);
		}
		if (model.containsBeer) {
			filteredData = filteredData.filter(bar => bar.cheapestBeer);
		}
		if (model.isHappyHour) {
			filteredData = filteredData.filter(bar => bar.inHappy);
		}
		return filteredData;
	}

	private getFilteredData(model): Observable<IBarProperties[]> {
		let backFiltersChanged = false;
		const filteredData = [...this.allData];
		const priceField = this.form.get('price');

		if (priceField.dirty) {
			this.filters['price'] = model.price;
			priceField.markAsPristine();
			backFiltersChanged = true;
		}

		if (!backFiltersChanged && this.previousResponse != null) {
			return of(this.addFrontFilters(model, this.previousResponse));
		}

		if (Object.keys(this.filters).length !== 0) {
			return this.barService.getFilteredBarsProperties(this.processFilters(this.filters)).pipe(
				tap(response => this.previousResponse = response),
				map(response => this.addFrontFilters(model, [...response]))
			);
		}

		return of(this.addFrontFilters(model, filteredData));
	}

	private processFilters(filters): string {
		let result = '';
		for (let filter in filters) {
			result += `${filter}=${filters[filter]}&`
		}
		return result.slice(0, -1);
	}
}
