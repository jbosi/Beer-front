import { BeerPropertiesService } from './services/beer-properties.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatCardModule, MatGridListModule, 
	MatFormFieldModule,MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { HomeComponent, MapComponent, AlgoliaSearchComponent, ButtonFilterComponent, MapPopupComponent, AutoCompleteComponent, MapPageComponent, BarPropertiesModalComponent, NavBarComponent, BeerFormComponent, PageNotFoundComponent , DashboardComponent, BarAdminComponent, BeerAdminComponent, AddBeerComponent, TableListBeerComponent} from './components';
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
	MatGridListModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatProgressSpinnerModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
];
@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		ButtonFilterComponent,
		AutoCompleteComponent,
		MapPageComponent,
		BarPropertiesModalComponent,
		NavBarComponent,
		BeerFormComponent,
		PageNotFoundComponent,
		MapPopupComponent,
		AlgoliaSearchComponent,
		HomeComponent,
		DashboardComponent,
		BarAdminComponent,
		BeerAdminComponent,
		AddBeerComponent,
		TableListBeerComponent
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
		FlexLayoutModule
	],
	providers: [
		BarPropertiesService,
		BeerPropertiesService,
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
