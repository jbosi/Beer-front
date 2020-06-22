import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent, BeerListComponent, MapPageComponent, HomeComponent, BarAdminComponent, BeerAdminComponent, DashboardComponent ,NavBarComponent, LoginComponent, RegisterComponent} from '../components';
import { MapResolver } from './resolvers';
import { AuthGuard } from './guards/auth.guard';
import { UserAdminComponent } from '../components/dashboard/user-admin/user-admin.component';

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
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: BarAdminComponent},
					{ path: 'bar', component: BarAdminComponent },
					{ path: 'biere', component: BeerAdminComponent },
					{ path: 'user', component: UserAdminComponent }
				]
			},
			{
				path: 'map',
				component: MapPageComponent,
				resolve: { mapData: MapResolver }
			},
			{
				path: 'beers',
				component: BeerListComponent,
				resolve: { mapData: MapResolver }
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
