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
