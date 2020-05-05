import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent, MapPageComponent, HomeComponent, AddBeerPageComponent } from '../components';

const routes: Routes = [
	{ path: 'map', component: MapPageComponent },
	{ path: 'add-beer', component: AddBeerPageComponent },
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }, 
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { } 