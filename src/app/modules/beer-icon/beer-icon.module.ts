import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BeerIconComponent } from './beer-icon.component';

@NgModule({
	declarations: [
		BeerIconComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		BeerIconComponent,
	]
})
export class BeerIconModule { }
