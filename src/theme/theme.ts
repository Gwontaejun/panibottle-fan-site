export const lightTheme = {
	// common
	commonColor: '#000',
	commonBgColor: '#FFF',
	headerBgColor: '#FFF',
	scrollThumbColor: '#616161',
	buttonColor: '#FFF',
	buttonBgColor: '#000',

	// mainPage
	mainBgColor: '#ff6600',

	// header
	navItemBgColor: '#FFF',
	navItemHoverBgColor: '#2B2B2B',
	navItemColor: '#000',
	navItemHoverColor: '#FFF',

	// popup
	popupBgColor: '#FFF',
	popupColor: '#000',

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
	commonBgColor: '#2B2B2B',
	headerBgColor: 'transparent',
	scrollThumbColor: 'lightgrey',
	buttonColor: '#D7D7D7',
	buttonBgColor: '#515151',

	// mainPage
	mainBgColor: '#2B2B2B',

	// header
	navItemBgColor: '#2B2B2B',
	navItemHoverBgColor: '#D7D7D7',
	navItemColor: '#D7D7D7',
	navItemHoverColor: '#000',

	// popup
	popupBgColor: '#2B2B2B',
	popupColor: '#D7D7D7',

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
