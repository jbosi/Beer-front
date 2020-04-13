export interface barProperties {
	id: number,
	name: string,
	address: string,
	coord: {
		lat: number,
		lon: number
	},
	// hhTime: weekDaysOpeningHours,
	// openingTime: weekDaysOpeningHours,
	beers: [
		{
			id: number,
			pricing: [
				{
					quantity: number,
					price: number,
				}
			]
			name: string,
			// image: string,
			degré: number,
			type: string,
		}
	],
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