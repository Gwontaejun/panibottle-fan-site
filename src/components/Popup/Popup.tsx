import React from 'react';
import FocusTrap from 'focus-trap-react';

import 'assets/styles/Popup.scss';

export interface PopupHooks {
	isShowing: boolean;
	// eslint-disable-next-line no-unused-vars
	toggle: (flag?: boolean) => void;
}

interface PopupTypes {
	popupHooks: PopupHooks;
	className?: string;
	children: React.ReactNode;
}

const Popup = (props: PopupTypes) => {
	const { popupHooks, className } = props;

	console.log('popupHooks.isShowing', popupHooks.isShowing);
	return (
		<FocusTrap active={popupHooks.isShowing}>
			<div className={`popup-wrapper ${className} ${popupHooks.isShowing ? 'show' : ''}`}>{props?.children}</div>
		</FocusTrap>
	);
};

export default Popup;
