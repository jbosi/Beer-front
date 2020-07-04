import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarProperties } from 'src/app/models';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatOption } from '@angular/material';

@Component({
	selector: 'app-map-page',
	templateUrl: './map-page.component.html',
	styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
	public isMobile: boolean;
	public barProperties: IBarProperties[];
	public bars: Observable<IBarProperties[]>;
	public barSearcher = new FormControl();
	public highlightedMarkerId = new Subject<number>();
	public showFilters = false;

	constructor(
		private activatedRoute: ActivatedRoute,
	) {}
	
	ngOnInit() {
		window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;
		
		this.activatedRoute.data.subscribe((response: { mapData: IBarProperties[] }) => {
			this.barProperties = response.mapData;
		});

		this.bars = this.barSearcher.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			map(value => typeof(value) === "string" ? this.filterBarSearch(value) : this.filterBarSearch(value.name))
		);
	}

	public getIsMobile(): boolean {
		return this.isMobile;
	}

	public toggleShowFilters(): void {
		this.showFilters = !this.showFilters;
	}

	private filterBarSearch(value: string): IBarProperties[] {
		if (value.length < 3) {
			return [{
				name: 'Continuez à écrire',
				address: null,
				id: null,
				inHappy: null,
				location: null,
				opened: null,
				tags: null
			}];
		}
		const filterValue = value.toLowerCase();
	
		return this.barProperties.filter(bar => bar.name.toLowerCase().includes(filterValue));
	}

	public setHighlightedBar(option: MatOption) {
		this.highlightedMarkerId.next(option.value.id);
	}

	public displayFn(bar?: IBarProperties): string | undefined {
		return bar ? bar.name : undefined;
	}
}
