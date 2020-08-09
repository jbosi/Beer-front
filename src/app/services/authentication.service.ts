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
		.pipe(map((response: {token: string}) => {
			// store token details and jwt token in local storage to keep token logged in between page refreshes
			const parsedToken: ITokenPayload = this.parseJwt(response.token);
			localStorage.setItem('token_id', JSON.stringify(response));
			localStorage.setItem('expires_at', JSON.stringify(parsedToken.exp));
			localStorage.setItem('user_id', JSON.stringify(parsedToken.sub).replace(/['"]+/g, ''));
			this.currentUserSubject.next(response);
			return response;
		}));
	}
	
	public logout() {
		// remove token from local storage and set current user to null
		localStorage.removeItem('token_id');
		localStorage.removeItem('expires_at');
		localStorage.removeItem('user_id');
		this.currentUserSubject.next(null);
	}

	public isExpired() {
		const expiration = localStorage.getItem('expires_at');
		const expiresAt = JSON.parse(expiration);
		return Date.now() > expiresAt;
	}

	public parseJwt(token): ITokenPayload {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	
		return JSON.parse(jsonPayload);
	};
}

export interface ITokenPayload {
	bars: any[];
	favourites: any[];
	email: string;
	exp: number;
	isAdmin: boolean;
	sub: string;
	username: string;
}