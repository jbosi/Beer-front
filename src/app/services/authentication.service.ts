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

	public get currentUserToken(): string {
		return this.currentUserSubject.value?.token;
	}

	constructor(
		private readonly http: HttpClient
	) {
		this.currentUserSubject = new BehaviorSubject<{token: string}>(JSON.parse(localStorage.getItem('token_id')));
		this.currentUser = this.currentUserSubject.asObservable();
		this.isLogged = this.currentUserSubject.asObservable().pipe(map(token => token != null));
	}

	public login(email: string, password: string) {
		return this.http.post<any>(`${API_URL}/users/signin`, { email, password })
		.pipe(
			map((response: { token: string }) => {
				// store token details and jwt token in local storage to keep token logged in between page refreshes
				const parsedToken: ITokenPayload = this.parseJwt(response.token);
				localStorage.setItem('token_id', JSON.stringify(response));
				localStorage.setItem('expires_at', JSON.stringify(parsedToken.exp));
				localStorage.setItem('user_id', JSON.stringify(parsedToken.sub).replace(/['"]+/g, ''));
				this.currentUserSubject.next(response);
				return response;
			})
		);
	}

	public logout(): void {
		// remove token from local storage and set current user to null
		localStorage.removeItem('token_id');
		localStorage.removeItem('expires_at');
		localStorage.removeItem('user_id');
		this.currentUserSubject.next(null);
	}

	public isExpired(): boolean {
		const expiration = localStorage.getItem('expires_at');
		const expiresAt = JSON.parse(expiration);
		return Date.now() > expiresAt;
	}

	public parseJwt(token): ITokenPayload {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}
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
