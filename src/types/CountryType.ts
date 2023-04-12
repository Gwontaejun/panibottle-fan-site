export interface Bounds {
	lat: number;
	lng: number;
}

export interface CountryInfo extends Bounds {
	doc_id?: string;
	country_code: string;
	country_name: string;
	icon_url: string;
	region?: string;
}
