import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';
@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
	public logoPath = './../../../assets/logo/logoTitleWhite.png';	// TODO replace with svg
	public isLogged = false;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.authenticationService.isLogged.subscribe(isLogged => this.isLogged = isLogged);
	}

	public logout() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
}
