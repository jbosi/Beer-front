import { beerInfo } from '../../models/bar-properties.model';
import { BeerPropertiesService } from '../../services/beer-properties.service';
import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-beer-form',
	templateUrl: './beer-form.component.html',
	styleUrls: ['./beer-form.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BeerFormComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => BeerFormComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class BeerFormComponent implements ControlValueAccessor, OnDestroy {
	public options: string[] = ['blonde', 'brune', 'noire', 'ambree', 'rouge', 'fruitee'];
	public form: FormGroup;
	private subscriptions: Subscription[] = [];
	onChange: any = () => {};
	onTouched: any = () => {};
	
	get value(): beerInfo {
		return this.form.value;
	}
	
	set value(value: beerInfo) {
		this.form.setValue(value);
		this.onChange(value);
		this.onTouched();
	}
	
	get nameControl() {
		return this.form.controls.name;
	}
	
	constructor( private beerPropertiesService: BeerPropertiesService, private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			name: [],
			brewery: [],
			degre: [],
			type: []
		});
		
		this.subscriptions.push(
			this.form.valueChanges.subscribe(value => {
				this.onChange(value);
				this.onTouched();
			})
		);
	}
		
		
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
	
	registerOnChange(fn) {
		this.onChange = fn;
	}
	
	writeValue(value) {
		if (value) {
			this.value = value;
		}
		
		if (value == null) {
			this.form.reset();
		}
	}
	
	registerOnTouched(fn) {
		this.onTouched = fn;
	}
	
	validate(_: FormControl) {
		return this.form.valid ? null : { addBeer: { valid: false } };
	}
		
}