import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		scrollThumbColor: string;
		bgColor: string;
		headerBgColor: string;
		headerHoverBgColor: string;
		navItemBgColor: string;
		navItemHoverBgColor: string;
		navItemColor: string;
		navItemHoverColor: string;
		popupBgColor: string;
		popupColor: string;
		popupButtonBgColor: string;
		popupButtonColor: string;
		skeletonColor: string;
		carouselArrowColor: string;
	}
}
