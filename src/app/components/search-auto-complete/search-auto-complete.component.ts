import { Component } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
	selector: 'app-search-auto-complete',
	templateUrl: './search-auto-complete.component.html',
	styleUrls: ['./search-auto-complete.component.scss']
})
export class AutoCompleteComponent implements AutocompleteLibModule {
	keyword = 'name';
	data = [
		{
			id: 1,
			name: 'Bar 1'
		},
		{
			id: 2,
			name: 'Bar 2'
		},
		{
			id: 3,
			name: 'Le bar de fou'
		},
		{
			id: 4,
			name: 'Le bar de Baptou'
		}
	];
	
	
	selectEvent(item) {
		// do something with selected item
	}
	
	onChangeSearch(val: string) {
		// fetch remote data from here
		// And reassign the 'data' which is binded to 'data' property.
	}
	
	onFocused(e){
		// do something when input is focused
	}
	
}