import { LatLngExpression } from 'leaflet';

export interface barProperties {
	id: number,
	name: string,
	address: string,
	coordinates: LatLngExpression,
	// hhTime: weekDaysOpeningHours,
	// openingTime: weekDaysOpeningHours,
	beers: beerInfo[]
}

export interface weekDaysOpeningHours {
	monday: DayOpeningHours,
	tuesday: DayOpeningHours,
	wednesday: DayOpeningHours,
	thursday: DayOpeningHours,
	friday: DayOpeningHours,
	saturday: DayOpeningHours,
	sunday: DayOpeningHours
}

export interface DayOpeningHours {
	start: string,
	end: string,
	isOpen: boolean
}

export interface beerInfo {
	id: number,
	pricing: [
		{
			quantity: number,
			price: number,
		}
	]
	name: string,
	image: string,
	degré: number,
	type: string,
}