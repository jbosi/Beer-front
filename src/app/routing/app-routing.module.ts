import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent, MapPageComponent, HomeComponent, BarAdminComponent, BeerAdminComponent, DashboardComponent } from '../components';



const routes: Routes = [
	{ path: 'map', component: MapPageComponent },
	{ path: 'dashboard', component: DashboardComponent,
		children: [
			{ path: '',	component: BarAdminComponent},
			{ path: 'bar', component: BarAdminComponent },
			{ path: 'biere', component: BeerAdminComponent }
		]
	},
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }, 
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { } 