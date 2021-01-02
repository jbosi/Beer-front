import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BarManagementComponent, NewRequestComponent, OwnedBarsComponent, PendingRequestComponent, ProfileComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@beer/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../routing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '', pathMatch: 'full', redirectTo: 'profile'
			},
			{
				path: 'profile', component: ProfileComponent
			},
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
	}
];

const MATERIAL_MODULES = [
	MatIconModule,
	MatFormFieldModule,
	MatToolbarModule,
	MatButtonModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatAutocompleteModule,
	MatSnackBarModule,
];

@NgModule({
	declarations: [
		DashboardComponent,
		ProfileComponent,
		BarManagementComponent,
		OwnedBarsComponent,
		NewRequestComponent,
		PendingRequestComponent,
	],
	imports: [
		MATERIAL_MODULES,
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class DashboardModule { }
