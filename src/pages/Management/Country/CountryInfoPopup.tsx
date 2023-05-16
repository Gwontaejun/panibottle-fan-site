import React from 'react';
import Popup, { PopupHooks } from 'components/Popup/Popup';
import Button from 'components/Button/Button';

const defaultIcon = require('assets/images/icon_question.svg').default;

interface CountryPopupProps {
	popupHooks: PopupHooks;
}

const CountryInfoPopup = (props: CountryPopupProps) => {
	const { popupHooks } = props;

	return (
		<Popup popupHooks={popupHooks} className="country-info-popup">
			<div className="popup-header">
				<img src={defaultIcon} alt="국기 아이콘" />
			</div>
			<div className="popup-content" />
			<div className="popup-bottom">
				<Button type="button" className="outline" onClick={() => popupHooks.toggle()}>
					취소
				</Button>
				<Button type="button" onClick={() => popupHooks.toggle()}>
					적용
				</Button>
			</div>
		</Popup>
	);
};

export default CountryInfoPopup;
