import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBeerInfo } from './../models';
import { API_URL } from '../app.config';

@Injectable()
export class BeerPropertiesService {

	constructor(
		private http: HttpClient,
	) { }

	public getBeers(): Observable<IBeerInfo[]> {
		return this.http.get<IBeerInfo[]>(`${API_URL}/beers`);
	}

	public addBeer(payload: any): Observable<any> {
		return this.http.post(`${API_URL}/beers`, payload);
	}

	public removeBeer(payload: any): Observable<any> {
		return this.http.post(`${API_URL}/beers`, payload);
	}

	public getBeerNames(): Observable<string[]> {
		return this.http.get<string[]>(`${API_URL}/beers/list-names`);
	}
}
