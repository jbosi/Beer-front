import { Injectable } from '@angular/core';
import { barProperties } from '../models/bar-properties.model';
import { of, Observable } from 'rxjs';

@Injectable()
export class BarPropertiesService {
	
	constructor() { }

	getMarkers(): Observable<barProperties[]> {
		// Mock Data
		return of([{
			id: 1,
			name: 'Loustic',
			address: '40 Rue Chapon, 75003 Paris',
			coord: {
				lat: 48.863869,
				lon: 2.354605,
			}
		},
		{
			id: 1,
			name: 'La Perla Bar',
			address: '26 Rue François Miron, 75004 Paris',
			coord: {
				lat: 48.855793,
				lon: 2.35612,
			}
		}])
	}
}
