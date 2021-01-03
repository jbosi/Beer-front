import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerListCardComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { BeersComponent } from './beers.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BeerIconModule, InfiniteScrollModule } from '@beer/modules';

const routes: Routes = [
	{
		path: '',
		component: BeersComponent,
	}
];

const MATERIAL_MODULES = [
	MatIconModule,
	MatProgressSpinnerModule,
];
@NgModule({
	declarations: [
		BeersComponent,
		BeerListCardComponent
	],
	imports: [
		MATERIAL_MODULES,
		RouterModule.forChild(routes),
		CommonModule,
		InfiniteScrollModule,
		BeerIconModule
	]
})
export class BeersModule { }
