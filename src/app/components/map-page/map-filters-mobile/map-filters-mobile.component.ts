import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, Inject } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IBarProperties } from '../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-map-filters-mobile',
	templateUrl: './map-filters-mobile.component.html',
	styleUrls: ['./map-filters-mobile.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MapFiltersMobileComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => MapFiltersMobileComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFiltersMobileComponent implements OnInit {

	@HostBinding('class.modalMapFilterMobile') modalMapFilter = window.innerWidth < 768;

	public form: FormGroup;
	private filteredData: IBarProperties[];
	private allData: IBarProperties[];

	constructor(
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: IBarProperties[],
		private dialogRef: MatDialogRef<any, any>
	) {	}

	ngOnInit() {
		this.allData = [...this.data];
		this.modalMapFilter = window.innerWidth < 768;
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
	}

	public onCancel(): void {
		this.dialogRef.close();
	}

}
