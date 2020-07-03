import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';


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

	getAllOwnershipById(id: number) {
		return this.http.get<any[]>(`${API_URL}/users/list-user-responsabilities/${id}`);
	}

	getAllOwnershipRequests() {
		return this.http.get<any[]>(`${API_URL}/users/list-user-ask-responsabilities`);
	}

	getAllOwnershipRequestsById(id: number) {
		return this.http.get<any[]>(`${API_URL}/users/list-user-ask-responsabilities/${id}`);
	}
	
	register(user: any) {
		return this.http.post(`${API_URL}/users/signup`, user);
	}
	
	delete(email: string) {
		return this.http.delete(`${API_URL}/users/${email}`);
	}
}