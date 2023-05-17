export interface Bounds {
	lat: number | null;
	lng: number | null;
}

export interface CountryInfo extends Bounds {
	doc_id?: string;
	country_code: string;
	country_name: string;
	icon_url?: string;
	region?: string;
}
