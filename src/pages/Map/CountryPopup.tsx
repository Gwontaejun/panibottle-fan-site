import React, { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { countryInfo } from 'store/mapStore';
import { Popup } from 'components';
import { PopupHooks } from 'components/Popup/Popup';

const CountryPopup = ({ popupHooks }: { popupHooks: PopupHooks }) => {
	const info = useRecoilValue(countryInfo);
	const resetInfo = useResetRecoilState(countryInfo);

	useEffect(() => {
		if (!popupHooks.isShowing) {
			resetInfo();
		}
	}, [popupHooks.isShowing, resetInfo]);

	return (
		<Popup popupHooks={popupHooks}>
			<div className="popup-content">
				<img src={info.icon_url} alt="국기 아이콘" />
				<h1>{info.country_name}(Republic of Korea)</h1>
				<span>Asia</span>
				<button type="button" onClick={() => popupHooks.toggle()}>
					dsadsasa
				</button>
			</div>
		</Popup>
	);
};

export default CountryPopup;
