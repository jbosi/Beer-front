import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { CalloutErrorModule } from '@beer/modules';
import { LoginComponent, RegisterComponent } from './components';

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
		CalloutErrorModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class AuthModule { }
