import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-beer-rounded-icon',
	templateUrl: './beer-rounded-icon.component.html',
	styleUrls: ['./beer-rounded-icon.component.scss']
})
export class BeerRoundedIconComponent {
	
	@Input() public backgroundColor: string = '#EECC60';
	@Input() public iconColor: string = '#FFFFFF';
	
	constructor() {}
	
}
