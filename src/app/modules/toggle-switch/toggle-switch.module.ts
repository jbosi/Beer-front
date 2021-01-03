import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from './toggle-switch.component';

@NgModule({
	declarations: [
		ToggleSwitchComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule
	],
	exports: [
		ToggleSwitchComponent,
	]
})
export class ToggleSwitchModule { }
