import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	PageNotFoundComponent,
	HomeComponent,
	BarAdminComponent,
	BeerAdminComponent,
	AdminDashboardComponent,
	NavBarComponent,
	LoginComponent,
	RegisterComponent,
	UserAdminComponent,
} from '../components';
import { AuthGuard } from './guards';

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
				path: 'admin-dashboard',
				component: AdminDashboardComponent,
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: BarAdminComponent },
					{ path: 'bar', component: BarAdminComponent },
					{ path: 'biere', component: BeerAdminComponent },
					{ path: 'user', component: UserAdminComponent }
				]
			},
			{
				path: 'dashboard',
				loadChildren: () => import('../pages/dashboard').then(m => m.DashboardModule)
			},
			{
				path: 'map',
				loadChildren: () => import('../pages/map').then(m => m.MapModule)
			},
			{
				path: 'beers',
				loadChildren: () => import('../pages/beers').then(m => m.BeersModule)
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
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
