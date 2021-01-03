import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@beer/shared';
import { AuthGuard } from '../../routing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AddBeerComponent, BarAdminComponent, BeerAdminComponent, BeerFormComponent, TableListBeerComponent, UserAdminComponent } from './components';

const routes: Routes = [
	{
		path: '',
		component: AdminDashboardComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'bar' },
			{ path: 'bar', component: BarAdminComponent },
			{ path: 'biere', component: BeerAdminComponent },
			{ path: 'user', component: UserAdminComponent }
		]
	}
];

const MATERIAL_MODULES = [
	MatIconModule,
	MatFormFieldModule,
	MatSelectModule,
	MatToolbarModule,
	MatButtonModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatTableModule,
	MatPaginatorModule
];

@NgModule({
	declarations: [
		UserAdminComponent,
		BeerFormComponent,
		AdminDashboardComponent,
		BarAdminComponent,
		BeerAdminComponent,
		AddBeerComponent,
		TableListBeerComponent
	],
	imports: [
		MATERIAL_MODULES,
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class AdminDashboardModule { }
