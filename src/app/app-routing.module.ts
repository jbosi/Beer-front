import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent, AddBeerFormComponent, MapPageComponent } from './components';

const routes: Routes = [
	{ path: 'map', component: MapPageComponent },
	{ path: 'add-beer', component: AddBeerFormComponent },
	{ path: '', redirectTo: '/map', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }, 
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { } 