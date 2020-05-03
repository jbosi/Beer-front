import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPageComponent } from './components/map-page/map-page.component';
import { AddBeerPageComponent } from './components/add-beer-page/add-beer-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: 'map', component: MapPageComponent },
	{ path: 'add-beer', component: AddBeerPageComponent },
	{ path: '',   redirectTo: '/map', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 