import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	AdminDashboardComponent, BarAdminComponent,
	BarManagementComponent, BeerAdminComponent, BeerListComponent,
	DashboardComponent, HomeComponent,
	LoginComponent, MapPageComponent,
	NavBarComponent,
	NewRequestComponent, OwnedBarsComponent, PageNotFoundComponent,
	PendingRequestComponent, ProfileComponent, RegisterComponent,
	UserAdminComponent
} from '../components';
import { AuthGuard } from './guards/auth.guard';
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
				component: DashboardComponent,
				canActivate: [AuthGuard],
				children: [
					{ path: '', pathMatch: 'full', redirectTo: 'profile' },
					{ path: 'profile', component: ProfileComponent },
					{
						path: 'bar-management',
						component: BarManagementComponent,
						children: [
							{ path: '', pathMatch: 'full', component: OwnedBarsComponent },
							{ path: 'pending-request', component: PendingRequestComponent },
							{ path: 'new', component: NewRequestComponent }
						]
					},
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
