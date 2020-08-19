import { IBeerInfo } from './beer-properties.model';

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
	characteristics: object;
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

export interface IBarNames {
	name: string;
	id: string;
}

export interface IFavoriteBar {
	barId: string;
}

export interface IOwnership {
	barId: string;
	userId: string;
	id: string;
}

export interface  IOwnershipResponse {
	bar: IDetailedBarProperties;
	id: string;
	user: {
		email: string;
		isAdmin: boolean;
		id: string;
		username: string;
	};
}

export interface IOwnershipRequest extends IOwnershipResponse {
	studied: boolean;
	accepted: boolean;
	reason: any;
	pictures: string[];
}
