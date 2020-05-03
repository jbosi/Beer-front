import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { createCustomElement } from '@angular/elements';
import 'hammerjs';

import { MapComponent, AlgoliaSearchComponent, ButtonFilterComponent, MapPopupComponent, AutoCompleteComponent, MapPageComponent, BarPropertiesModalComponent, NavBarComponent, AddBeerFormComponent, PageNotFoundComponent } from './components';
import { BarPropertiesService } from './services';

// Keep these dependencies ?
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { NgAisModule } from 'angular-instantsearch';

const MATERIAL_MODULES = [
	MatIconModule,
	MatToolbarModule,
	MatButtonModule,
	MatDialogModule,
	MatCardModule,
]

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		ButtonFilterComponent,
		AutoCompleteComponent,
		MapPageComponent,
		BarPropertiesModalComponent,
		NavBarComponent,
		AddBeerFormComponent,
		PageNotFoundComponent,
		MapPopupComponent,
		AlgoliaSearchComponent
	],
	imports: [
		...MATERIAL_MODULES,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AutocompleteLibModule,
		ReactiveFormsModule,
		DynamicFormsMaterialUIModule,
		AppRoutingModule,
		NgAisModule.forRoot(),
	],
	providers: [
		BarPropertiesService,
	],
	entryComponents: [BarPropertiesModalComponent, MapPopupComponent],
	bootstrap: [AppComponent]
})
export class AppModule { 
	constructor(private injector: Injector) {
		const PopupElement = createCustomElement(MapPopupComponent, {injector});
		customElements.define('popup-element', PopupElement);
	}
 }
