import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'app-beer-list-card',
	templateUrl: './beer-list-card.component.html',
	styleUrls: ['./beer-list-card.component.scss']
})

export class BeerListCardComponent implements OnInit {
	public beerIcon = require('./../../../../icons/beers/beerIcon.svg');

	constructor() { }
	
	ngOnInit() {
	}
	
}
