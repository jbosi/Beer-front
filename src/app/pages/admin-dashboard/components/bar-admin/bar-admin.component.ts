import { BarPropertiesService } from '@beer/services';
import {Component, ViewChild, OnInit} from '@angular/core';
import { IBarProperties } from '@beer/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-bar-admin',
	templateUrl: './bar-admin.component.html',
	styleUrls: ['./bar-admin.component.scss']
})
export class BarAdminComponent implements OnInit {
	public displayedColumns: string[] = ['name'];
	public bars: MatTableDataSource<IBarProperties>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	public isLoadingResults = false;

	constructor(
		private readonly barPropertiesService: BarPropertiesService
	) {}

	ngOnInit(): void {
		this.isLoadingResults = true;
		this.barPropertiesService.getBarsProperties().subscribe(data => {
			this.bars = new MatTableDataSource(data);
			this.bars.paginator = this.paginator;
			this.bars.sort = this.sort;
			this.isLoadingResults = false;
		});
	}

	public applyFilter(event: Event): void {
		const filterValue: string = (event.target as HTMLInputElement).value;
		this.bars.filter = filterValue.trim().toLowerCase();

		this.bars.paginator?.firstPage();
	}
}
