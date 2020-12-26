import { ScrollingModule } from '@angular/cdk/scrolling';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule, MatButtonModule,
	MatCardModule,
	MatCheckboxModule, MatDialogModule,
	MatFormFieldModule, MatGridListModule, MatIconModule,
	MatInputModule,
	MatListModule, MatPaginatorModule,
	MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule,
	MatSliderModule,
	MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import * as Sentry from '@sentry/angular';
import 'hammerjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {
	AddBeerComponent, AdminDashboardComponent,
	AdminTableComponent, BarAdminComponent,
	BarManagementComponent, BeerAdminComponent, BeerFormComponent, BeerIconComponent,
	BeerListCardComponent,
	BeerListComponent,
	BeerTableComponent,
	CalloutErrorComponent, DashboardComponent, HomeComponent,
	InfiniteScrollComponent, InputAutocompleteComponent, LoginComponent,
	MapComponent, MapFiltersComponent,
	MapPageComponent, MapPopupComponent,
	NavBarComponent,
	NewRequestComponent, OwnedBarsComponent, PageNotFoundComponent,
	PendingRequestComponent, ProfileComponent, RegisterComponent,
	TableListBeerComponent,
	ToggleSwitchComponent, UserAdminComponent
} from './components';
import { AppRoutingModule } from './routing/app-routing.module';
import { BarPropertiesService, UploadService } from './services';
import { BeerPropertiesService } from './services/beer-properties.service';
import { JwtInterceptor } from './utils/jwt.interceptor';


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

const SENTRY_PROVIDERS = [
	{
		provide: ErrorHandler,
		useValue: Sentry.createErrorHandler({
			showDialog: true,
		}),
	},
	{
		provide: Sentry.TraceService,
		deps: [Router],
	},
	{
		provide: APP_INITIALIZER,
		useFactory: () => () => {},
		deps: [Sentry.TraceService],
		multi: true,
	},
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
		AdminTableComponent,
		InfiniteScrollComponent,
		CalloutErrorComponent
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
		UploadService,
		...SENTRY_PROVIDERS
	],
	entryComponents: [MapPopupComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
		const PopupElement = createCustomElement(MapPopupComponent, { injector });
		customElements.define('popup-element', PopupElement);
	}
}
