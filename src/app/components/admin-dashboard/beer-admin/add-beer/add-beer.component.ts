import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BeerPropertiesService } from '@beer/services';


@Component({
	selector: 'app-add-beer',
	templateUrl: './add-beer.component.html',
	styleUrls: ['./add-beer.component.scss']
})
export class AddBeerComponent {
	public addBeerForm: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly beerPropertiesService: BeerPropertiesService
	) {
		this.addBeerForm = this.formBuilder.group({
			addBeer: [],
		});
	}

	public submit(): void {
		this.beerPropertiesService.addBeer(this.addBeerForm.value);
	}

	public resetForm(): void {
		this.addBeerForm.reset();
	}
}
