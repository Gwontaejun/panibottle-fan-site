import React from 'react';
import FocusTrap from 'focus-trap-react';

import 'assets/styles/Popup.scss';
import styled from 'styled-components';

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

const PopupWrapper = styled.div`
	color: ${(props) => props.theme.popupColor};

	.popup-container {
		background-color: ${(props) => props.theme.popupBgColor};
	}
`;

const Popup = (props: PopupTypes) => {
	const { popupHooks, className } = props;

	return (
		<FocusTrap active={popupHooks.isShowing}>
			<PopupWrapper className={`popup-wrapper ${className} ${popupHooks.isShowing ? 'show' : ''}`}>
				<div className="popup-dim" />
				<div className="popup-container">{props?.children}</div>
			</PopupWrapper>
		</FocusTrap>
	);
};

export default Popup;
