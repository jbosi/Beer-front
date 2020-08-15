import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IBarProperties } from '../../models';
import { BarPropertiesService, UserService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PendingRequestResolver {
	constructor(
		protected router: Router,
		private userService: UserService
	) {	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
		const userId = localStorage.getItem('user_id');
		return this.userService.getAllOwnershipRequestsByUserId(userId);
	}
}