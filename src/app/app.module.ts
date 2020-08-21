import { BeerPropertiesService } from './services/beer-properties.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {
	MatIconModule,
	MatButtonModule,
	MatDialogModule,
	MatToolbarModule,
	MatCardModule,
	MatGridListModule,
	MatTableModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatProgressSpinnerModule,
	MatPaginatorModule,
	MatSortModule,
	MatCheckboxModule,
	MatSliderModule,
	MatAutocompleteModule,
	MatSnackBarModule,
	MatListModule,
	MatProgressBarModule,
	MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {
	UserAdminComponent,
	RegisterComponent,
	LoginComponent,
	BeerIconComponent,
	BeerListCardComponent,
	BeerListComponent,
	MapFiltersComponent,
	HomeComponent,
	MapComponent,
	MapPopupComponent,
	MapPageComponent,
	NavBarComponent,
	BeerFormComponent,
	PageNotFoundComponent,
	AdminDashboardComponent,
	BarAdminComponent,
	BeerAdminComponent,
	AddBeerComponent,
	TableListBeerComponent,
	DashboardComponent,
	InputAutocompleteComponent,
	ProfileComponent,
	BarManagementComponent,
	BeerTableComponent,
	OwnedBarsComponent,
	NewRequestComponent,
	PendingRequestComponent,
  ToggleSwitchComponent,
  AdminTableComponent
} from './components';
import { BarPropertiesService, UploadService } from './services';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
	MatSliderModule,
	MatAutocompleteModule,
	MatSnackBarModule,
	MatListModule,
	MatProgressBarModule,
	MatSlideToggleModule
];

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		MapPageComponent,
		NavBarComponent,
		BeerFormComponent,
		PageNotFoundComponent,
		MapPopupComponent,
		HomeComponent,
		AdminDashboardComponent,
		BarAdminComponent,
		BeerAdminComponent,
		AddBeerComponent,
		TableListBeerComponent,
		MapFiltersComponent,
		BeerListComponent,
		BeerListCardComponent,
		BeerIconComponent,
		LoginComponent,
		RegisterComponent,
		UserAdminComponent,
		InputAutocompleteComponent,
		DashboardComponent,
		ProfileComponent,
		BarManagementComponent,
		BeerTableComponent,
		OwnedBarsComponent,
		NewRequestComponent,
		PendingRequestComponent,
		ToggleSwitchComponent,
		AdminTableComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		DynamicFormsMaterialUIModule,
		AppRoutingModule,
		FlexLayoutModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		ScrollingModule,
		...MATERIAL_MODULES,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		BarPropertiesService,
		BeerPropertiesService,
		UploadService
	],
	entryComponents: [MapPopupComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
		const PopupElement = createCustomElement(MapPopupComponent, {injector});
		customElements.define('popup-element', PopupElement);
	}
}
