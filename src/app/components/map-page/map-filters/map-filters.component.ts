import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IBarProperties } from 'src/app/models';

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
	public form: FormGroup;
	private filteredData: IBarProperties[];
	private allData: IBarProperties[];
	@Input() public data: IBarProperties[] = [];
	@Output() public dataChange = new EventEmitter<IBarProperties[]>();

	constructor(
		private formBuilder: FormBuilder
	) {	}

	ngOnInit() {
		this.allData = [...this.data];

		this.form = this.formBuilder.group({
			isOpened: undefined,
			containsBeer: undefined,
			isHappyHour: undefined
		});

		this.form.valueChanges.pipe(
			debounceTime(250)
		).subscribe((model) => {
			this.onFormChange(model);
		})
	}

	private onFormChange(model: any) {
		this.filteredData = [...this.allData];

		if (model.opened) {
			this.filteredData = this.filteredData.filter(bar => bar.opened);
		}
		if (model.containsBeer) {
			this.filteredData = this.filteredData.filter(bar => bar.cheapestBeer);
		}
		if (model.isHappyHour) {
			this.filteredData = this.filteredData.filter(bar => bar.inHappy);
		}
		this.dataChange.emit(this.filteredData);
	}

}
