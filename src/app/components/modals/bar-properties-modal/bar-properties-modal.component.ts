import { Component, OnInit } from '@angular/core';

//TODO: remove when image will be provided in data
declare var require: any;

@Component({
	selector: 'app-bar-properties-modal',
	templateUrl: './bar-properties-modal.component.html',
	styleUrls: ['./bar-properties-modal.component.scss']
})
export class BarPropertiesModalComponent implements OnInit {
	
	constructor(
	) { }

	ngOnInit() {
		// console.log('data', this.data)
	}

	//TODO: remove when image will be provided in data
	getBeerImage(beerType: string) {
		return require(`../../../../icons/beers/beer-${beerType}.png`)
	}
}

	