import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@beer/shared';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent, RegisterComponent } from './components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
];

const MATERIAL_MODULES = [
	MatIconModule,
	MatProgressSpinnerModule,
	MatFormFieldModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule
];

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
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
export class AuthModule { }
