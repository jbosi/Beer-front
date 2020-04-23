import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPageComponent } from './components/map-page/map-page.component';
import { AddBeerFormComponent } from './components/add-beer-form/add-beer-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: 'map', component: MapPageComponent },
	{ path: 'add-beer', component: AddBeerFormComponent },
	{ path: '',   redirectTo: '/map', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 