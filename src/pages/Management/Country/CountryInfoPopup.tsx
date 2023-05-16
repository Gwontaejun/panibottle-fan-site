import React, { useRef } from 'react';
import Popup, { PopupHooks } from 'components/Popup/Popup';
import Button from 'components/Button/Button';

const defaultIcon = require('assets/images/icon_question.svg').default;

interface CountryPopupProps {
	popupHooks: PopupHooks;
}

const CountryInfoPopup = (props: CountryPopupProps) => {
	const { popupHooks } = props;
	const fileRef = useRef<HTMLInputElement>(null);

	const onCountryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('e', e);
	};

	return (
		<Popup popupHooks={popupHooks} className="country-info-popup">
			<div className="popup-header">
				<input type="file" ref={fileRef} accept="image/jpeg, image/png" onChange={onCountryImage} />
				<span role="presentation" className="select-image" onClick={() => fileRef.current?.click()}>
					이미지를
					<br />
					선택해주세요.
				</span>
				<img className="country-image" src={defaultIcon} alt="국기 아이콘" />
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
