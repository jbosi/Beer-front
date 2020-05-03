import { beerInfo } from './../../models/bar-properties.model';
import { BeerPropertiesService } from './../../services/beer-properties.service';

import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup,
	 Validators, FormControl, NG_VALIDATORS, Form } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-beer-form',
  templateUrl: './add-beer-form.component.html',
  styleUrls: ['./add-beer-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddBeerFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddBeerFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBeerFormComponent implements ControlValueAccessor, OnDestroy {
	options = ['blonde', 'brune', 'noire', 'ambree', 'rouge', 'fruitee'];
	form: FormGroup;
	subscriptions: Subscription[] = [];
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
	  


  constructor( private beerPropertiesService: BeerPropertiesService, private formBuilder: FormBuilder) {

	this.form = this.formBuilder.group({
		Name: [],
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
	
		if (value === null) {
		  this.form.reset();
		}
	  }
	
	  registerOnTouched(fn) {
		this.onTouched = fn;
	  }

	setDisabledState?(isDisabled: boolean): void {
		throw new Error("Method not implemented.");
	}

	validate(_: FormControl) {
		return this.form.valid ? null : { addBeer: { valid: false, }, };
	  }


}
