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


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ButtonFilterComponent,
    AutoCompleteComponent,
    MapPageComponent,
    BarPropertiesModalComponent,
    NavBarComponent,
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
  ],
  providers: [
	BarPropertiesService,
],
  entryComponents: [BarPropertiesModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
