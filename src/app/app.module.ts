import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map-page/map/map.component';
import { ButtonFilterComponent } from './components/button-filter/button-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatButtonModule, MatDialogModule, MatToolbarModule } from '@angular/material';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AutoCompleteComponent } from './components/search-auto-complete/search-auto-complete.component';
import { BarPropertiesService } from './services/bar-properties.service';
import { MapPageComponent } from './components/map-page/map-page.component';
import { BarPropertiesModalComponent } from './components/modals/bar-properties-modal/bar-properties-modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddBeerFormComponent } from './components/add-beer-form/add-beer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MapPopupComponent } from './components/map-popup/map-popup.component'

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
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatIconModule,
		HttpClientModule,
		MatToolbarModule,
		MatButtonModule,
		AutocompleteLibModule,
		MatDialogModule,
		ReactiveFormsModule,
		DynamicFormsMaterialUIModule,
		AppRoutingModule,
	],
	providers: [
		BarPropertiesService,
	],
	entryComponents: [BarPropertiesModalComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
