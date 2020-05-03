import { BeerPropertiesService } from './../../services/beer-properties.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-beer-page',
  templateUrl: './add-beer-page.component.html',
  styleUrls: ['./add-beer-page.component.scss']
})
export class AddBeerPageComponent implements OnInit {
	addBeerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private beerPropertiesService: BeerPropertiesService) {
	  this.addBeerForm = this.formBuilder.group({
		addBeer: [],
	  })
  }

  submit() {
	console.log(this.addBeerForm.value);
	this.beerPropertiesService.addBeer(this.addBeerForm.value);
;
  }

  resetForm() {
    this.addBeerForm.reset();
  }

  ngOnInit() {
  }

}
