import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	HomeComponent,
	LoginComponent, NavBarComponent, PageNotFoundComponent,
	RegisterComponent
} from '../components';

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
				loadChildren: () => import('../pages/admin-dashboard').then(m => m.AdminDashboardModule)
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
