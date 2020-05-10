import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
	public logoPath: string = require('./../../../assets/logo/logoTitleWhite.png');	
	
	constructor() { }
	
	ngOnInit() {
	}
	
}
