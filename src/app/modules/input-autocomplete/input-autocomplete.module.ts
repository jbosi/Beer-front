import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputAutocompleteComponent } from './input-autocomplete.component';

const MATERIAL_MODULES = [
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatAutocompleteModule,
];

@NgModule({
	declarations: [
		InputAutocompleteComponent
	],
	imports: [
		MATERIAL_MODULES,
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		ScrollingModule
	],
	exports: [
		InputAutocompleteComponent,
	]
})
export class InputAutocompleteModule { }
