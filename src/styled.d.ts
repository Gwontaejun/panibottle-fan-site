import { CSSObject, CSSProp } from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		commonBgColor: string;
		commonColor: string;
		headerBgColor: string;
		scrollThumbColor: string;
		buttonColor: string;
		buttonBgColor: string;

		mainBgColor: string;

		navItemBgColor: string;
		navItemHoverBgColor: string;
		navItemColor: string;
		navItemHoverColor: string;

		popupBgColor: string;
		popupColor: string;

		skeletonColor: string;
		carouselArrowColor: string;

		checkIcon: string;
		editIcon: string;
		deleteIcon: string;
		addIcon: string;
		threeLineIcon: string;
	}
}

declare module 'react' {
	interface Attributes {
		css?: CSSProp | CSSObject;
	}
}
