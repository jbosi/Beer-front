import { BeerPropertiesService } from './services/beer-properties.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import * as Sentry from '@sentry/angular';

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
	HomeComponent,
	NavBarComponent,
	BeerFormComponent,
	PageNotFoundComponent,
	AdminDashboardComponent,
	BarAdminComponent,
	BeerAdminComponent,
	AddBeerComponent,
	TableListBeerComponent,
} from './components';
import { BarPropertiesService, UploadService } from './services';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
		NavBarComponent,
		BeerFormComponent,
		PageNotFoundComponent,
		HomeComponent,
		AdminDashboardComponent,
		BarAdminComponent,
		BeerAdminComponent,
		AddBeerComponent,
		TableListBeerComponent,
		LoginComponent,
		RegisterComponent,
		UserAdminComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
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
	entryComponents: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
