import {Component, ViewChild, OnInit} from '@angular/core';
import { BeerPropertiesService } from '@beer/services';
import { IBeerInfo } from '@beer/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-table-list-beer',
	templateUrl: './table-list-beer.component.html',
	styleUrls: ['./table-list-beer.component.scss']
})
export class TableListBeerComponent implements OnInit {
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	public displayedColumns: string[] = ['name'];
	public beers: MatTableDataSource<IBeerInfo>;
	public isLoadingResults = false;

	constructor(
		private readonly beerPropertiesService: BeerPropertiesService
	) {}

	ngOnInit(): void {
		this.isLoadingResults = true;
		this.beerPropertiesService.getBeers().subscribe(data => {
			this.beers = new MatTableDataSource(data);
			this.beers.paginator = this.paginator;
			this.beers.sort = this.sort;
			this.isLoadingResults = false;
		});
	}

	public applyFilter(event: Event): void {
		const filterValue: string = (event.target as HTMLInputElement).value;
		this.beers.filter = filterValue.trim().toLowerCase();

		this.beers.paginator?.firstPage();
	}
}
