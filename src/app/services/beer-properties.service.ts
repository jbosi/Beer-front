import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BeerPropertiesService {
	
	constructor(
		private http: HttpClient,
	) { }

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
	