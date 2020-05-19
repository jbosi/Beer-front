import { IBeerInfo } from './../models/bar-properties.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BeerPropertiesService {

	constructor(
		private http: HttpClient,
	) { }

	getBeers() : Observable<IBeerInfo[]> {
		return this.http.get<IBeerInfo[]>('https://aleforall.herokuapp.com/beers');
	}

	addBeer(payload: any): Observable<any> {
		return this.http.post('URL', payload).pipe(
			map(response => response)
		);
	}

	removeBeer(payload: any): Observable<any> {
		return this.http.post('URL', payload).pipe(
			map(response => response)
		);
	}
}
