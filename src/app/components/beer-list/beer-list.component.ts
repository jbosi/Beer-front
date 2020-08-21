import { Component, OnInit } from '@angular/core';
import { BeerPropertiesService } from '../../services';
import { IBeerInfo } from '../../models';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-beer-list',
	templateUrl: './beer-list.component.html',
	styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
	public beers$: Observable<IBeerInfo[]>;

	constructor(
		private beersService: BeerPropertiesService
	) { }

	ngOnInit() {
		this.beers$ = this.beersService.getBeers();
	}
}
