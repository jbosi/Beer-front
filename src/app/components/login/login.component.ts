import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly authenticationService: AuthenticationService,
	) {
		if (this.authenticationService.currentUserToken) {
			this.router.navigate(['/map']);
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		// get return url from route parameters or default to '/map'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/map';
	}

	// convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		this.authenticationService.login(this.f.email.value, this.f.password.value)
		.pipe(first())
		.subscribe(
			data => {
				this.router.navigate([this.returnUrl]);
			},
			error => {
				console.log('[authError]', error);
				this.loading = false;
		});
	}
}
