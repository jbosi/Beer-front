import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatOption } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
	selector: '[app-input-autocomplete]',
	templateUrl: './input-autocomplete.component.html',
	styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit {
	@Input() public itemNames: { name: string }[] = [];
	@Input() public placeHolder: string;
	@Output() public selectedItemChanged = new EventEmitter<string>();
	public itemSearcher = new FormControl();
	public items: Observable<any[]>;
	
	constructor() { }
	
	ngOnInit() {
		this.items = this.itemSearcher.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			map(value => typeof(value) === "string" ? this.filterItemSearch(value) : this.filterItemSearch(value.name))
		);

		if (this.placeHolder == null) {
			this.placeHolder = "Recherchez";
		}
	}

	public setSelectedItemChanged(option: MatOption): void {
		this.selectedItemChanged.emit(option.value.id);
	}

	public displayFn(item?: { name: string }): string | undefined {
		return item ? item.name : undefined;
	}

	private filterItemSearch(value: string): any[] {
		if (value.length < 4) {
			return [{
				name: 'Continuez à écrire',
				id: null,
			}];
		}
		const filterValue = value.toLowerCase();
	
		return this.itemNames.filter(item => item.name.toLowerCase().includes(filterValue));
	}
	
}
