import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { IOwnership, IOwnershipRequest } from '../models';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private http: HttpClient) { }

	checkUserName(username: string) { // back not ready yet
		return this.http.get<any[]>(`${API_URL}/users/check-username?username=${username}`);
	}
	
	getAllUsers() {
		return this.http.get<any[]>(`${API_URL}/users`);
	}
	
	getAllOwnership() {
		return this.http.get<any[]>(`${API_URL}/users/list-user-responsabilities`);
	}

	getAllOwnershipByUserId(userId: string): Observable<IOwnership[]> {
		return this.http.get<IOwnership[]>(`${API_URL}/users/list-user-responsabilities/${userId}`);
	}

	getAllOwnershipRequests() {
		return this.http.get<any[]>(`${API_URL}/users/list-user-ask-responsabilities`);
	}

	getAllOwnershipRequestsByUserId(userId: string): Observable<IOwnershipRequest[]> {
		return this.http.get<IOwnershipRequest[]>(`${API_URL}/users/list-user-ask-responsabilities/${userId}`);
	}
	
	register(user: any) {
		return this.http.post(`${API_URL}/users/signup`, user);
	}

	getfavoritesByUserId(id: string) {
		return this.http.get<any[]>(`${API_URL}/users/favourites/${id}`);
	}

	favorites(id: string) {
		return this.http.post(`${API_URL}/users/favourites`, { barId: id });
	}
	
	unfavorites(id: string) {
		return this.http.delete(`${API_URL}/users/favourites/${id}`);
	}

	delete(email: string) {
		return this.http.delete(`${API_URL}/users/${email}`);
	}

	requestOwnership(payload: any) {
		return this.http.post<any>(`${API_URL}/users/ask-for-bar-responsability`, payload);
	}
}