import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map.component';
import { MapFiltersComponent, MapItemComponent, MapPopupComponent } from './components';
import { createCustomElement } from '@angular/elements';
import { MapResolver } from './resolvers';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from '../../../app/shared';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: MapComponent,
		resolve: { mapData: MapResolver }
	}
];

const MATERIAL_MODULES = [
	MatIconModule,
	MatFormFieldModule,
	MatSelectModule,
	// MatToolbarModule,
	MatButtonModule,
	MatDialogModule,
	// MatCardModule,
	// MatGridListModule,
	// MatInputModule,
	MatProgressSpinnerModule,
	// MatTableModule,
	// MatPaginatorModule,
	// MatSortModule,
	// MatCheckboxModule,
	MatSliderModule,
	// MatAutocompleteModule,
	MatSnackBarModule,
	// MatListModule,
	// MatProgressBarModule,
	MatSlideToggleModule
];

@NgModule({
	declarations: [
		MapComponent,
		MapFiltersComponent,
		MapItemComponent,
		MapPopupComponent,
	],
	entryComponents: [
		MapPopupComponent
	],
	imports: [
		MATERIAL_MODULES,
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule,
		ScrollingModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class MapModule {
	constructor(private injector: Injector) {
		const PopupElement = createCustomElement(MapPopupComponent, { injector });
		customElements.define('popup-element', PopupElement);
	}
}
