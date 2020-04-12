import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map-page/map/map.component';
import { ButtonFilterComponent } from './components/button-filter/button-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AutoCompleteComponent} from './components/search-auto-complete/search-auto-complete.component';
import { BarPropertiesService } from './services/bar-properties.service';
import { MapPageComponent } from './components/map-page/map-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ButtonFilterComponent,
    AutoCompleteComponent,
    MapPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    AutocompleteLibModule,
  ],
  providers: [BarPropertiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
