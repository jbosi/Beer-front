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
			},
			beers: [
				{
					id: 3,
					pricing: [
						{
							quantity: 33,
							price: 2,
						}
					],
					name: 'Triple Karmeliet',
					degré: 8,
					image: '../../icons/beers/beer-blond.png',
					type: 'blond',
				},
				{
					id: 6,
					pricing: [
						{
							quantity: 50,
							price: 5,
						}
					],
					name: 'straffe hendrik quadruple',
					degré: 12,
					image: '../../icons/beers/beer-brown.png',
					type: 'brown',
				},
				{
					id: 8,
					pricing: [
						{
							quantity: 33,
							price: 4,
						}
					],
					name: 'Celis white',
					degré: 6,
					image: '../../icons/beers/beer-white.png',
					type: 'white',
				}
			],
		},
		{
			id: 2,
			name: 'La Perla Bar',
			address: '26 Rue François Miron, 75004 Paris',
			coord: {
				lat: 48.855793,
				lon: 2.35612,
			},
			beers: [
				{
					id: 6,
					pricing: [
						{
							quantity: 50,
							price: 5,
						}
					],
					name: 'straffe hendrik quadruple',
					image: '../../icons/beers/beer-brown.png',
					degré: 12,
					type: 'brown',
				}
			],
		}])
	}
}
