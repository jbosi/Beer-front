import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
	selector: '[app-input-autocomplete]',
	templateUrl: './input-autocomplete.component.html',
	styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit {
	@Input() public itemNames: any[] = [];
	@Input() public placeHolder: string;
	@Input() public isColoredAutocomplete = false;
	@Output() public selectedItemChanged = new EventEmitter<any>();
	public itemSearcher = new FormControl();
	public items: Observable<any[]>;

	constructor() { }

	ngOnInit() {
		this.items = this.itemSearcher.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			filter(value => value != null),
			map(value => typeof(value) === 'string' ? this.filterItemSearch(value) : this.filterItemSearch(value.name))
		);
	}

	public setSelectedItemChanged(option: MatOption): void {
		if (option.value && option.value.id === null) {
			return;
		}
		this.selectedItemChanged.emit(option.value);
	}

	public displayFn(item?: any): string | undefined {
		return item ? (item.name || item) : undefined;
	}

	private filterItemSearch(value: string): any[] {
		if (value.length < 4) {
			return [{
				name: 'Continuez à écrire',
				id: null,
			}];
		}
		const filterValue = value.toLowerCase();

		return this.itemNames.filter(item => (item.name || item).toLowerCase().includes(filterValue));
	}

	public clearInput(): void {
		this.itemSearcher.reset();
		this.selectedItemChanged.emit(null);
	}
}
