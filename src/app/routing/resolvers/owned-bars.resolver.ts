import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IBarProperties } from '../../models';
import { BarPropertiesService, UserService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class OwnedBarsResolver {
	constructor(
		protected router: Router,
		private barService: BarPropertiesService,
		private userService: UserService
	) {	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
		const userId = localStorage.getItem('user_id');
		const result = [];
		// this.userService.getAllOwnershipByUserId(userId).pipe(
		// 	switchMap(ownerships => ownerships.map(ownership => this.barService.getBarPropertiesById(ownership.barId)))
		// ).subscribe(bar => result.push(bar))
		return
	}
}