import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AdminTableComponent } from './admin-table.component';

const MATERIAL_MODULES = [
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatTableModule,
	MatPaginatorModule,
	MatAutocompleteModule,
	// MatSelectModule,
	// MatToolbarModule,
	// MatDialogModule,
	// MatCardModule,
	// MatGridListModule,
	// MatProgressSpinnerModule,
	// MatSortModule,
	// MatCheckboxModule,
	// MatSliderModule,
	// MatSnackBarModule,
	// MatListModule,
	// MatProgressBarModule,
	// MatSlideToggleModule
];

@NgModule({
	declarations: [
		AdminTableComponent
	],
	imports: [
		MATERIAL_MODULES,
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
		AdminTableComponent,
	]
})
export class AdminTableModule { }
