
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { barProperties } from '../models/';


@Injectable()
export class BarPropertiesService {
	
	constructor(
		public http: HttpClient
	) {	}

	getMarkers(): Observable<barProperties[]> {
		return this.http.get('https://aleforall.herokuapp.com/bars').pipe(
			map((response: any) => {
				return response.map( (bar: any) => {

					return {
							coordinates: [bar.location.latitude, bar.location.longitude],
							id:  2,
							name: bar.name,
							address: bar.address,
							minPrice: bar.minPrice || 0,
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
						}
					}
				)
			})
		)

		

		// Mock Data
		// return of([{
		// 	"type": "Feature",
      	// 	"geometry": {
		// 		"type": "Point",
		// 		"coordinates": [
		// 			2.354605,
		// 			48.863869
		// 		]
		// 	},
		// 	"properties": {
		// 		"id": 1,
		// 		"name": 'Loustic',
		// 		"address": '40 Rue Chapon, 75003 Paris',
		// 		"beers": [
		// 			{
		// 				"id": 3,
		// 				"pricing": [
		// 					{
		// 						"quantity": 33,
		// 						"price": 2,
		// 					}
		// 				],
		// 				"name": 'Triple Karmeliet',
		// 				"degré": 8,
		// 				"image": '../../icons/beers/beer-blond.png',
		// 				"type": 'blond',
		// 			},
		// 			{
		// 				"id": 6,
		// 				"pricing": [
		// 					{
		// 						"quantity": 50,
		// 						"price": 5,
		// 					}
		// 				],
		// 				"name": 'straffe hendrik quadruple',
		// 				"degré": 12,
		// 				"image": '../../icons/beers/beer-brown.png',
		// 				"type": 'brown',
		// 			},
		// 			{
		// 				"id": 8,
		// 				"pricing": [
		// 					{
		// 						"quantity": 33,
		// 						"price": 4,
		// 					}
		// 				],
		// 				"name": 'Celis white',
		// 				"degré": 6,
		// 				"image": '../../icons/beers/beer-white.png',
		// 				"type": 'white',
		// 			}
		// 		],
		// 	}
		// },
		// {
		// 	"type": "Feature",
		// 	"geometry": {
		// 		"type": "Point",
		// 		"coordinates": [
		// 			2.35612,
		// 			48.855793
		// 		]
		// 	},
		// 	"properties": {
		// 		// "image-name": 'test',
		// 		// "icon": "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
		// 		"id":  2,
		// 		"name": 'La Perla Bar',
		// 		"address": '26 Rue François Miron, 75004 Paris',
		// 		"beers": [
		// 			{
		// 				"id": 6,
		// 				"pricing": [
		// 					{
		// 						"quantity": 50,
		// 						"price": 5,
		// 					}
		// 				],
		// 				"name": 'straffe hendrik quadruple',
		// 				"image": '../../icons/beers/beer-brown.png',
		// 				"degré": 12,
		// 				"type": 'brown',
		// 			}
		// 		],
		// 	}
		// }])
	}

	getBars(): Observable<barProperties[]>{
		return this.http.get<barProperties[]>('https://aleforall.herokuapp.com/bars');
	}
}
