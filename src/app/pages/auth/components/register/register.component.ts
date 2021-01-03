import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthenticationService, UserService } from '@beer/services';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;
	public hasError = false;
	public errorsMessage: string[];

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
		private userService: UserService,
	) {
		// redirect to home if already logged in
		if (this.authenticationService.currentUserToken) {
			this.router.navigate(['/map']);
		}
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			passwordConfirmed: ['', Validators.required]
		});

		this.registerForm.get('username').valueChanges.pipe(
			debounceTime(250),
			distinctUntilChanged(),
			switchMap(username => this.userService.checkUserName(username))
		).subscribe(
			_ => { return; },
			error => this.handleError(error)
		);
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit(): void {
		this.submitted = true;
		this.hasError = false;

		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;
		this.userService.register(this.registerForm.value)
		.pipe(first())
		.subscribe(
			_ => this.router.navigate(['/auth']),
			error => this.handleError(error)
		);
	}

	private handleError(error): void {
		this.hasError = true;
		this.loading = false;
		const message = error.error.message;
		this.errorsMessage = Array.isArray(message) ? message : [message];
	}
}
