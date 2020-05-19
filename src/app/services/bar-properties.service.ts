
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBarProperties, IDetailedBarProperties } from '../models/';

@Injectable()
export class BarPropertiesService {

	constructor(public http: HttpClient) { }

	public getBarsProperties(): Observable<IBarProperties[]> {
		return this.http.get<IBarProperties[]>('https://aleforall.herokuapp.com/bars');
	}

	public getBarPropertiesById(id: string): Observable<IDetailedBarProperties> {
		return this.http.get<IDetailedBarProperties>(`https://aleforall.herokuapp.com/bars/${id}`);
	}
}
