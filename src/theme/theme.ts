export const lightTheme = {
	// common
	commonColor: '#000',
	commonBgColor: '#fff',
	headerBgColor: '#FFF',
	scrollThumbColor: '#616161',

	// mainPage
	mainBgColor: '#ff6600',

	// header
	navItemBgColor: '#FFF',
	navItemHoverBgColor: '#282c35',
	navItemColor: '#000',
	navItemHoverColor: '#FFF',

	// popup
	popupBgColor: '#FFF',
	popupColor: '#000',
	popupButtonBgColor: '#000',
	popupButtonColor: '#FFF',

	// components
	skeletonColor: 'lightgrey',
	carouselArrowColor: '#000',

	// icons
	checkIcon: require('assets/images/light_check.svg').default,
	editIcon: require('assets/images/light_edit.svg').default,
	deleteIcon: require('assets/images/light_delete.svg').default,
	addIcon: require('assets/images/light_add.svg').default,
	threeLineIcon: require('assets/images/light_three_line.svg').default,
};

export const darkTheme = {
	// common
	commonColor: '#D7D7D7',
	commonBgColor: '#282c35',
	headerBgColor: 'transparent',
	scrollThumbColor: 'lightgrey',

	// mainPage
	mainBgColor: '#282c35',

	// header
	navItemBgColor: '#282c35',
	navItemHoverBgColor: '#D7D7D7',
	navItemColor: '#D7D7D7',
	navItemHoverColor: '#000',

	// popup
	popupBgColor: '#282c35',
	popupColor: '#D7D7D7',
	popupButtonBgColor: '#5B5F67',
	popupButtonColor: '#D7D7D7',

	// components
	skeletonColor: '#616161',
	carouselArrowColor: '#FFF',

	// icons
	checkIcon: require('assets/images/dark_check.svg').default,
	editIcon: require('assets/images/dark_edit.svg').default,
	deleteIcon: require('assets/images/dark_delete.svg').default,
	addIcon: require('assets/images/dark_add.svg').default,
	threeLineIcon: require('assets/images/dark_three_line.svg').default,
};

export default {
	lightTheme,
	darkTheme,
};
