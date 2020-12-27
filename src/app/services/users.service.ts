import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { IOwnershipResponse, IOwnershipRequest } from '../models';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private http: HttpClient) { }

	public checkUserName(username: string) {
		return this.http.get<any[]>(`${API_URL}/users/check-username?username=${username}`);
	}

	public getAllUsers() {
		return this.http.get<any[]>(`${API_URL}/users`);
	}

	public getAllOwnership() {
		return this.http.get<any[]>(`${API_URL}/users/list-user-responsabilities`);
	}

	public getAllOwnershipByUserId(userId: string): Observable<IOwnershipResponse[]> {
		return this.http.get<IOwnershipResponse[]>(`${API_URL}/users/list-user-responsabilities/${userId}`);
	}

	public getAllOwnershipRequests() {
		return this.http.get<any[]>(`${API_URL}/users/list-user-ask-responsabilities`);
	}

	public getAllOwnershipRequestsByUserId(userId: string): Observable<IOwnershipRequest[]> {
		return this.http.get<IOwnershipRequest[]>(`${API_URL}/users/list-user-ask-responsabilities/${userId}`);
	}

	public register(user: any) {
		return this.http.post(`${API_URL}/users/signup`, user);
	}

	public getfavoritesByUserId(id: string) {
		return this.http.get<any[]>(`${API_URL}/users/favourites/${id}`);
	}

	public favorites(id: string, userId: string) {
		return this.http.post(`${API_URL}/users/favourites`, { barId: id, userId });
	}

	public unfavorites(id: string, userId: string) {
		return this.http.delete(`${API_URL}/users/favourites/${id}?userId=${userId}`);
	}

	public delete(email: string) {
		return this.http.delete(`${API_URL}/users/${email}`);
	}

	public requestOwnership(payload: any) {
		return this.http.post<any>(`${API_URL}/users/ask-for-bar-responsability`, payload);
	}

	public acceptOrRefuseRequest(payload: { userId: string, barId: string, stateRequest: boolean }) {
		return this.http.post<any>(`${API_URL}/users/handle-bar-responsability`, payload);
	}
}
