import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent, MapPageComponent, HomeComponent, BarAdminComponent, BeerAdminComponent, DashboardComponent ,NavBarComponent} from '../components';
import { MapResolver } from './resolvers';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,	
		pathMatch: 'full',
	},
	{
		path: '',
		component: NavBarComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
				children: [
					{ path: '', component: BarAdminComponent},
					{ path: 'bar', component: BarAdminComponent },
					{ path: 'biere', component: BeerAdminComponent }
				]
			},
			{
				path: 'map',
				component: MapPageComponent,
				resolve: { mapData: MapResolver }
			},
		]
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}, 
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
