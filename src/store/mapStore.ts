import { atom } from 'recoil';
import { CountryInfo } from 'types/CountryType';

export const countryInfo = atom<CountryInfo>({
	key: 'countryInfo',
	default: {
		country_code: '',
		country_name: '',
		icon_url: '',
		region: '',
		lat: 0,
		lng: 0,
	},
	dangerouslyAllowMutability: true,
});

export const countryVideo = atom<string[]>({
	key: 'countryVideo',
	default: [],
});
