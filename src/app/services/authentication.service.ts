import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.config';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<{token: string}>;
	public currentUser: Observable<{token: string}>;
	public isLogged: Observable<boolean>;
	
	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<{token: string}>(JSON.parse(localStorage.getItem('token_id')));
		this.currentUser = this.currentUserSubject.asObservable();
		this.isLogged = this.currentUserSubject.asObservable().pipe(map(token => token != null));
	}
	
	public get currentUserToken(): string {
		if (this.currentUserSubject.value != null) {
			return this.currentUserSubject.value.token;
		}
		return null;
	}
	
	public login(email, password) {
		return this.http.post<any>(`${API_URL}/users/signin`, { email, password })
		.pipe(map(token => {
			// store token details and jwt token in local storage to keep token logged in between page refreshes
			localStorage.setItem('token_id', JSON.stringify(token));
			const tokenExpiration = Date.now() + 1000 * 60 * 60;
			localStorage.setItem('expires_at', JSON.stringify(tokenExpiration.valueOf()))
			this.currentUserSubject.next(token);
			return token;
		}));
	}
	
	public logout() {
		// remove token from local storage and set current user to null
		localStorage.removeItem('token_id');
		localStorage.removeItem("expires_at");
		this.currentUserSubject.next(null);
	}

	public isExpired() {
		const expiration = localStorage.getItem("expires_at");
		const expiresAt = JSON.parse(expiration);
		return Date.now() > expiresAt;
	}
}