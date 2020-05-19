import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { IBarProperties } from '../../models/bar-properties.model';
import { BarPropertiesService } from '../../services/bar-properties.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
	selector: 'app-search-auto-complete',
	templateUrl: './search-auto-complete.component.html',
	styleUrls: ['./search-auto-complete.component.scss']
})
export class AutoCompleteComponent implements AutocompleteLibModule, OnInit {
	
	constructor(
		private barPropertiesService: BarPropertiesService,
	) {}
		
	@Output() itemChanged = new EventEmitter<number>();
	
	public keyword = 'name';
	public data: Observable<IBarProperties[]>;

	ngOnInit() {
		this.data = this.barPropertiesService.getBarsProperties().pipe(
			map(bars => bars)
		);
	}
	
	selectEvent(item : IBarProperties) {
		// this.itemChanged.emit(item.id);
	}
	
	onChangeSearch(val: string) {
		// fetch remote data from here
		// And reassign the 'data' which is binded to 'data' property.
	}
	
	onFocused(e: any){
		// do something when input is focused
	}
	
}