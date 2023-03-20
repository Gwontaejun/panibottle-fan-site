import { atom, selector } from 'recoil';

export const darkModeState = atom({
	key: 'darkModeState',
	default: false,
});

export const darkModeSelector = selector({
	key: 'darkModeSelector',
	get: ({ get }) => get(darkModeState),
	set: ({ set }, newValue) => set(darkModeState, !newValue),
});
