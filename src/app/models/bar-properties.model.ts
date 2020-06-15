export interface IBarProperties {
	id: string;
	name: string;
	address: string;
	location: {
		latitude: number;
		longitude: number;
	};
	tags: string[];
	opened: boolean;
	inHappy: boolean;
	cheapestBeer?: number;
}

export interface IWeekDaysOpeningHours {
	monday: IDayOpeningHours;
	tuesday: IDayOpeningHours;
	wednesday: IDayOpeningHours;
	thursday: IDayOpeningHours;
	friday: IDayOpeningHours;
	saturday: IDayOpeningHours;
	sunday: IDayOpeningHours;
}

export interface IDayOpeningHours {
	opening: string;
	closing: string;
}

export interface IBeerInfo {
	name: string;
	id: number;
	pricing: [
		{
			quantity: number;
			priceBeer: number;
			priceHappy: number;
			volume: number;
		}
	];
	type: string;
	volume: number;
	picture: string;
	brewery: string;
	alcohol: number;
	description: string;
	ibu: number;
	descriptionObject: {
		eye: string;
		mouth: string;
		nose: string;
	};
}

export interface IDetailedBarProperties {
	id: string;
	address: string;
	name: string;
	location: {
		latitude: number;
		longitude: number;
	};
	tags: string[];
	type: string;
	characteristics: Object;
	happyHourTime: IWeekDaysOpeningHours;
	openingTime: IWeekDaysOpeningHours;
	privateaserBookingUrl: string;
	privateaserId: string;
	beers: IBeerInfo[];
	keywords: string;
	opened: boolean;
	inHappy: boolean;
	cheapestBeer: number;
}

export interface IBarBeerDetail {
	name: string;
	price: number;
	priceHH: number;
	icon: string;
	quantity: string;
}