import { ScrollingModule } from '@angular/cdk/scrolling';
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
import { BeerIconComponent, BeerTableComponent, CalloutErrorComponent, InfiniteScrollComponent, InputAutocompleteComponent, ToggleSwitchComponent } from './components';
import { AdminTableComponent } from './components/admin-table';

const MATERIAL_MODULES = [
	MatIconModule,
	MatFormFieldModule,
	// MatSelectModule,
	// MatToolbarModule,
	MatButtonModule,
	// MatDialogModule,
	// MatCardModule,
	// MatGridListModule,
	MatInputModule,
	// MatProgressSpinnerModule,
	MatTableModule,
	MatPaginatorModule,
	// MatSortModule,
	// MatCheckboxModule,
	// MatSliderModule,
	MatAutocompleteModule,
	// MatSnackBarModule,
	// MatListModule,
	// MatProgressBarModule,
	// MatSlideToggleModule
];

@NgModule({
	declarations: [
		InputAutocompleteComponent,
		ToggleSwitchComponent,
		BeerTableComponent,
		BeerIconComponent,
		AdminTableComponent,
		InfiniteScrollComponent,
		CalloutErrorComponent
	],
	imports: [
		MATERIAL_MODULES,
		CommonModule,
		ScrollingModule,
		ReactiveFormsModule
	],
	exports: [
		InputAutocompleteComponent,
		ToggleSwitchComponent,
		BeerTableComponent,
		BeerIconComponent,
		AdminTableComponent,
		InfiniteScrollComponent
	]
})
export class SharedModule { }
