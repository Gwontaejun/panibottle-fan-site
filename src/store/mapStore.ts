import { atom } from 'recoil';

export const countryInfo = atom({
	key: 'countryInfo',
	default: {
		country_name: '',
		description: '',
		icon_url: '',
		region: '',
	},
	dangerouslyAllowMutability: true,
});

export const countryVideo = atom<string[]>({
	key: 'countryVideo',
	default: [],
});

// export const darkModeSelector = selector({
// 	key: 'darkModeSelector',
// 	get: ({ get }) => get(darkModeState),
// 	set: ({ set }, newValue) => set(darkModeState, !newValue),
// });
