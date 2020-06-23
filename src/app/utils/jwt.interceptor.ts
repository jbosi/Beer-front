import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		private authenticationService: AuthenticationService
	) {}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const currentUserToken = this.authenticationService.currentUserToken;
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