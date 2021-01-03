import { Component, OnInit, Input } from '@angular/core';
import { IBeerDescriptionInfo, IBeerInfo } from '@beer/models';
import { BEER_ICON_TYPES_COLORS } from '@beer/utils';

@Component({
	selector: 'app-beer-list-card',
	templateUrl: './beer-list-card.component.html',
	styleUrls: ['./beer-list-card.component.scss']
})

export class BeerListCardComponent implements OnInit {
	@Input() public beerInfo: IBeerInfo;
	public beerDescription: IBeerDescriptionInfo;
	public flipCard = false;
	public beerIconColor: string;

	public get hasDescription(): boolean {
		return this.beerDescription != null && (!!this.beerDescription.eye || !!this.beerDescription.mouth || !!this.beerDescription.nose);
	}

	public get hasInfo(): boolean {
		return this.beerInfo != null && (!!this.beerInfo.alcohol || !!this.beerInfo.type || !!this.beerInfo.brewery);
	}

	ngOnInit(): void {
		this.beerDescription = this.beerInfo.descriptionObject;
		this.beerIconColor = BEER_ICON_TYPES_COLORS[this.beerInfo.type] || '#FFFFFF';
	}

	public onIconClick(): void {
		this.flipCard = true;
	}

	public onCrossClick(): void {
		this.flipCard = false;
	}
}
