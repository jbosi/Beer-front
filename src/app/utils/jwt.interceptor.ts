import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		private readonly authenticationService: AuthenticationService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const currentUserToken = this.authenticationService.currentUserToken;
		if (this.authenticationService.isExpired()) {
			this.authenticationService.logout();
		}
		if (currentUserToken) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUserToken}`
				}
			});
		}

		return next.handle(request);
	}
}
