import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/users.service';
import { AuthenticationService } from '../../services';


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
	}
	
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }
	
	onSubmit() {
		this.submitted = true;
		this.hasError = false;
		
		if (this.registerForm.invalid) {
			return;
		}
		
		this.loading = true;
		this.userService.register(this.registerForm.value)
		.pipe(first())
		.subscribe(
			data => {
				this.router.navigate(['/login']);
			},
			error => {
				this.hasError = true
				this.loading = false;
				const message = error.error.message;
				this.errorsMessage = Array.isArray(message) ? message : [message] ;
		});
	}
}