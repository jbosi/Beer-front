import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, Inject } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IBarProperties } from 'src/app/models';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

	@HostBinding('class.modalMapFilter') modalMapFilter = window.innerWidth < 768;

	public form: FormGroup;
	private filteredData: IBarProperties[];
	private allData: IBarProperties[];

	constructor(
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public dialogData: IBarProperties[],
		private dialogRef: MatDialogRef<any, any>
	) {	}

	ngOnInit() {
		if (this.data.length === 0 && this.dialogData != null && this.dialogData.length > 0) {
			this.data = this.dialogData;
		}
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
		this.dataChange.emit(this.filteredData);
	}

	public onCancel(): void {
		this.dialogRef.close();
	}

}
