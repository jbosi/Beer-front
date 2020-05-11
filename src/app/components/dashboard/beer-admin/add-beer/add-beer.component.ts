import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BeerPropertiesService } from 'src/app/services';


@Component({
  selector: 'app-add-beer',
  templateUrl: './add-beer.component.html',
  styleUrls: ['./add-beer.component.scss']
})
export class AddBeerComponent implements OnInit {
	addBeerForm1: FormGroup;

	constructor(private formBuilder: FormBuilder, private beerPropertiesService: BeerPropertiesService) {
	  this.addBeerForm1 = this.formBuilder.group({
		addBeer: [],
	  });
	}
  
	submit() {
	  console.log(this.addBeerForm1.value);
	  this.beerPropertiesService.addBeer(this.addBeerForm1.value);
	}
  
	resetForm() {
	  this.addBeerForm1.reset();
	}
  
	ngOnInit() {
	}
}
