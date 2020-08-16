import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BeerPropertiesService } from '../../../../services';


@Component({
	selector: 'app-add-beer',
	templateUrl: './add-beer.component.html',
	styleUrls: ['./add-beer.component.scss']
})
export class AddBeerComponent implements OnInit {
	public addBeerForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private beerPropertiesService: BeerPropertiesService
	) {
		this.addBeerForm = this.formBuilder.group({
			addBeer: [],
		});
	}

	submit() {
		this.beerPropertiesService.addBeer(this.addBeerForm.value);
	}

	resetForm() {
		this.addBeerForm.reset();
	}

	ngOnInit() {
	}
}
