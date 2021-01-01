import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private readonly router: Router,
		private readonly authenticationService: AuthenticationService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authenticationService.currentUserToken;
		if (currentUser) {
			return true;
		}

		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
		return false;
	}
}
