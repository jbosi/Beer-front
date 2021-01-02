import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerListCardComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { BeersComponent } from './beers.component';

const routes: Routes = [
	{
		path: '',
		component: BeersComponent,
	}
];

@NgModule({
	declarations: [
		BeersComponent,
		BeerListCardComponent
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
	]
})
export class BeersModule { }
