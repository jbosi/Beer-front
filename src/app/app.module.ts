import { BeerPropertiesService } from './services/beer-properties.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MatIconModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatCardModule, MatGridListModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatSliderModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UserAdminComponent, RegisterComponent, LoginComponent, BeerIconComponent, BeerListCardComponent, BeerListComponent, MapFiltersComponent, HomeComponent, MapComponent, MapPopupComponent, AutoCompleteComponent, MapPageComponent, NavBarComponent, BeerFormComponent, PageNotFoundComponent , DashboardComponent, BarAdminComponent, BeerAdminComponent, AddBeerComponent, TableListBeerComponent, MapFiltersMobileComponent} from './components';
import { BarPropertiesService } from './services';
import { JwtInterceptor } from './utils/jwt.interceptor';

// Keep these dependencies ?
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
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
	MatTableModule,
	MatProgressSpinnerModule,
	MatCheckboxModule,
	MatSliderModule
];

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		AutoCompleteComponent,
		MapPageComponent,
		NavBarComponent,
		BeerFormComponent,
		PageNotFoundComponent,
		MapPopupComponent,
		HomeComponent,
		DashboardComponent,
		BarAdminComponent,
		BeerAdminComponent,
		AddBeerComponent,
		TableListBeerComponent,
		MapFiltersComponent,
		BeerListComponent,
		BeerListCardComponent,
		BeerIconComponent,
		MapFiltersMobileComponent,
		LoginComponent,
		RegisterComponent,
		UserAdminComponent
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
		FlexLayoutModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		BarPropertiesService,
		BeerPropertiesService,
	],
	entryComponents: [MapPopupComponent, MapFiltersMobileComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
		const PopupElement = createCustomElement(MapPopupComponent, {injector});
		customElements.define('popup-element', PopupElement);
	}
 }
