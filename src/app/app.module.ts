import { ScrollingModule } from '@angular/cdk/scrolling';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Sentry from '@sentry/angular';
import 'hammerjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {
	LoginComponent,
	NavBarComponent,
	RegisterComponent
} from './components';
import { AppRoutingModule } from './routing/app-routing.module';
import { BarPropertiesService, UploadService } from './services';
import { BeerPropertiesService } from './services/beer-properties.service';
import { SharedModule } from './shared';
import { CalloutErrorComponent } from './shared/components';
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
		LoginComponent,
		RegisterComponent
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
		SharedModule
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
