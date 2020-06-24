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
	
	login(email, password) {
		return this.http.post<any>(`${API_URL}/users/signin`, { email, password })
		.pipe(map(token => {
			// store token details and jwt token in local storage to keep token logged in between page refreshes
			localStorage.setItem('token_id', JSON.stringify(token));
			this.currentUserSubject.next(token);
			return token;
		}));
	}
	
	logout() {
		// remove user from local storage and set current user to null
		localStorage.removeItem('token_id');
		this.currentUserSubject.next(null);
	}
}