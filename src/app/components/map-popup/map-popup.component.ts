import { Component, OnInit, Input } from '@angular/core';
import { barProperties } from '../../models';

@Component({
	selector: 'app-map-popup',
	templateUrl: './map-popup.component.html',
	styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements OnInit {
	
	@Input() barData: barProperties;
	
	constructor() { }
	
	ngOnInit() {
	}
	
}
