import { BarPropertiesService } from '../../../services';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IBarProperties } from '../../../models';

@Component({
	selector: 'app-bar-admin',
	templateUrl: './bar-admin.component.html',
	styleUrls: ['./bar-admin.component.scss']
})
export class BarAdminComponent implements AfterViewInit {
	public displayedColumns: string[] = ['name'];
	public bars: MatTableDataSource<IBarProperties>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	public isLoadingResults = false;

	constructor(private barPropertiesService: BarPropertiesService) {
		this.isLoadingResults = true;
	}

	ngAfterViewInit() {
		this.isLoadingResults = true;
		this.barPropertiesService.getBarsProperties().subscribe(data => {
			this.bars = new MatTableDataSource(data);
			this.bars.paginator = this.paginator;
			this.bars.sort = this.sort;
			this.isLoadingResults = false;
		});
	}

	applyFilter(event: Event): void {
		const filterValue: string = (event.target as HTMLInputElement).value;
		this.bars.filter = filterValue.trim().toLowerCase();

		if (this.bars.paginator) {
			this.bars.paginator.firstPage();
		}
	}
}