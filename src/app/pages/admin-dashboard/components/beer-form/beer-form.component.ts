import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBeerInfo } from '@beer/models';


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

	public get value(): IBeerInfo {
		return this.form.value;
	}

	public set value(value: IBeerInfo) {
		this.form.setValue(value);
		this.onChange(value);
		this.onTouched();
	}

	public get nameControl() {
		return this.form.controls.name;
	}

	constructor(
		private readonly formBuilder: FormBuilder
	) {
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

	ngOnDestroy(): void {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	registerOnChange(fn): void {
		this.onChange = fn;
	}

	writeValue(value): void {
		if (value) {
			this.value = value;
		}

		if (value == null) {
			this.form.reset();
		}
	}

	registerOnTouched(fn): void {
		this.onTouched = fn;
	}

	public validate(_: FormControl): { addBeer: { valid: boolean } } {
		return this.form.valid ? null : { addBeer: { valid: false } };
	}

}
