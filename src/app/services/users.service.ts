import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';


@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private http: HttpClient) { }
	
	getAll() {
		return this.http.get<any[]>(`${API_URL}/users`);
	}
	
	register(user: any) {
		return this.http.post(`${API_URL}/users/signup`, user);
	}
	
	delete(id: number) {
		return this.http.delete(`${API_URL}/users/${id}`);
	}
}