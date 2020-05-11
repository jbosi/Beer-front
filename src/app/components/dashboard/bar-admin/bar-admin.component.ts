import { BarPropertiesService } from 'src/app/services';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { barProperties } from 'src/app/models';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.component.html',
  styleUrls: ['./bar-admin.component.scss']
})
export class BarAdminComponent implements AfterViewInit {
	displayedColumns: string[] = ['name'];
	bars: MatTableDataSource<barProperties>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	isLoadingResults=false;
	
	constructor(private barPropertiesService: BarPropertiesService) {
		this.isLoadingResults=true;
	}
	
		ngAfterViewInit() {
			this.isLoadingResults=true;
			this.barPropertiesService.getBars().subscribe(data => {
				this.bars = new MatTableDataSource(data)
				this.bars.paginator = this.paginator;
				this.bars.sort = this.sort;
				this.isLoadingResults=false;
			});
		}

		applyFilter(event: Event) {
			const filterValue = (event.target as HTMLInputElement).value;
			this.bars.filter = filterValue.trim().toLowerCase();
		
			if (this.bars.paginator) {
			  this.bars.paginator.firstPage();
			}
		  }
	}
	
	// this.barPropertiesService.getBars().subscribe((bars: barProperties[]) => {
	// 	bars.map((bar: barProperties) =>{
			
	// 		this.bars.push(bar);
