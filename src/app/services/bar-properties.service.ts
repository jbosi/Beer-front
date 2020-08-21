
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBarProperties, IDetailedBarProperties } from '../models/';
import { API_URL } from '../app.config';

@Injectable()
export class BarPropertiesService {

	constructor(public http: HttpClient) { }

	public getBarsProperties(): Observable<IBarProperties[]> {
		return this.http.get<IBarProperties[]>(`${API_URL}/bars`);
	}

	public getBarPropertiesById(id: string): Observable<IDetailedBarProperties> {
		return this.http.get<IDetailedBarProperties>(`${API_URL}/bars/${id}`);
	}

	public getFilteredBarsProperties(filters: string): Observable<IBarProperties[]> {
		return this.http.get<IBarProperties[]>(`${API_URL}/bars?${filters}`);
	}
}
