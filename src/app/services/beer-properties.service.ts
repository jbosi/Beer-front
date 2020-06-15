import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBeerInfo } from './../models';

@Injectable()
export class BeerPropertiesService {

	constructor(
		private http: HttpClient,
	) { }

	public getBeers() : Observable<IBeerInfo[]> {
		return this.http.get<IBeerInfo[]>('https://aleforall.herokuapp.com/beers');
	}

	public addBeer(payload: any): Observable<any> {
		return this.http.post('URL', payload).pipe(
			map(response => response)
		);
	}

	public removeBeer(payload: any): Observable<any> {
		return this.http.post('URL', payload).pipe(
			map(response => response)
		);
	}
}
