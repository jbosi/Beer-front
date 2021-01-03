import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BeerIconModule } from '../beer-icon';
import { BeerTableComponent } from './beer-table.component';

const MATERIAL_MODULES = [
	MatIconModule,
	MatButtonModule,
];

@NgModule({
	declarations: [
		BeerTableComponent
	],
	imports: [
		MATERIAL_MODULES,
		CommonModule,
		ReactiveFormsModule,
		BeerIconModule
	],
	exports: [
		BeerTableComponent,
	]
})
export class BeerTableModule { }
