import { Component, OnInit, Input } from '@angular/core';
import { IBeerInfo } from '../../../models';
import { BEER_ICON_TYPES_COLORS } from '../../../utils';

declare var require: any;

@Component({
	selector: 'app-beer-list-card',
	templateUrl: './beer-list-card.component.html',
	styleUrls: ['./beer-list-card.component.scss']
})

export class BeerListCardComponent implements OnInit {
	@Input() public beerInfo: IBeerInfo;
	public beerDescription;

	ngOnInit() {
		this.beerDescription = this.beerInfo.descriptionObject;
	}

	public getBeerIconColor(type: string): string {
		return BEER_ICON_TYPES_COLORS[type] || '#FFFFFF';
	}
}
