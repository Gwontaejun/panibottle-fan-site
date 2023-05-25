import { atom, selector } from 'recoil';

export const darkModeState = atom<boolean>({
	key: 'darkModeState',
	default: false,
});

export const darkModeSelector = selector<boolean>({
	key: 'darkModeSelector',
	get: ({ get }) => get(darkModeState),
	set: ({ set }, newValue) => set(darkModeState, !newValue),
});
