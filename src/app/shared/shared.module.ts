import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerIconComponent, BeerTableComponent, InfiniteScrollComponent, InputAutocompleteComponent, ToggleSwitchComponent } from './components';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminTableComponent } from './components/admin-table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CalloutErrorComponent } from './components/callout-error/callout-error.component';

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
