import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IOwnershipResponse } from '../../models';
import { BarPropertiesService, UserService } from '../../services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OwnedBarsResolver {
	constructor(
		protected router: Router,
		private userService: UserService
	) {	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOwnershipResponse[]> {
		const userId = localStorage.getItem('user_id');
		return this.userService.getAllOwnershipByUserId(userId);
	}
}
