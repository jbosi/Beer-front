import { Component, Output, EventEmitter } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { barProperties } from 'src/app/models/bar-properties.model';

@Component({
	selector: 'app-search-auto-complete',
	templateUrl: './search-auto-complete.component.html',
	styleUrls: ['./search-auto-complete.component.scss']
})
export class AutoCompleteComponent implements AutocompleteLibModule {

	constructor(
	) {}

	@Output() itemChanged: EventEmitter<number> = new EventEmitter<number>();

	keyword = 'name';
	data: barProperties[] = [
		{
			id: 1,
			name: 'Loustic',
			address: '40 Rue Chapon, 75003 Paris',
			coord: {
				lat: 48.863869,
				lon: 2.354605,
			}
		},
		{
			id: 2,
			name: 'La Perla Bar',
			address: '26 Rue François Miron, 75004 Paris',
			coord: {
				lat: 48.855793,
				lon: 2.35612,
			}
		}
	];
	
	
	selectEvent(item : barProperties) {
		this.itemChanged.emit(item.id);
	}
	
	onChangeSearch(val: string) {
		// fetch remote data from here
		// And reassign the 'data' which is binded to 'data' property.
	}
	
	onFocused(e){
		// do something when input is focused
	}
	
}