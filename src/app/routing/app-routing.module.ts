import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent, AddBeerPageComponent, MapPageComponent, HomeComponent, NavBarComponent } from '../components';

const routes: Routes = [
	{
		path: '', component: HomeComponent,	
		pathMatch: 'full',
	},
	{
		path: '',
		component: NavBarComponent,
		children: [
			{ path: 'map', component: MapPageComponent },
			{ path: 'add-beer', component: AddBeerPageComponent },
		]
	},
	{ path: '**', component: PageNotFoundComponent }, 
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { } 