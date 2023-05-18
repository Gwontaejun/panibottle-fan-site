import React, { useRef, useState } from 'react';
import Popup, { PopupHooks } from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import CountrySearch from 'components/AutoComplete/CountrySearch';
import TagInput from 'components/TagInput/TagInput';

import { CountryInfo } from 'types/CountryType';
import { Grid } from '@mui/material';

const defaultIcon = require('assets/images/icon_question.svg').default;

interface CountryPopupProps {
	popupHooks: PopupHooks;
}

const CountryInfoPopup = (props: CountryPopupProps) => {
	const { popupHooks } = props;
	const fileRef = useRef<HTMLInputElement>(null);
	const iconRef = useRef<HTMLImageElement>(null);
	const [info, setInfo] = useState<CountryInfo>({
		country_code: '',
		country_name: '',
		lat: null,
		lng: null,
	});
	const [tagList, setTagList] = useState<string[]>([]);

	const onCountryImage = (e: React.ChangeEvent) => {
		const targetFiles = (e.target as HTMLInputElement).files as FileList;

		const render = new FileReader();
		render.onload = (file) => {
			if (iconRef.current) {
				iconRef.current.src = file.target?.result as string;
			}
		};

		render.readAsDataURL(targetFiles[0]);
	};

	const onCountrySelect = (data: CountryInfo) => {
		setInfo(data);
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
				<img ref={iconRef} className="country-image" src={defaultIcon} alt="국기 아이콘" />
			</div>
			<div className="popup-content">
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<h3>국가명</h3>
					</Grid>
					<Grid item xs={9}>
						<CountrySearch onCountrySelect={onCountrySelect} />
					</Grid>
					<Grid item xs={3}>
						<h3>국가코드</h3>
					</Grid>
					<Grid item xs={9}>
						<h4>{info.country_code}</h4>
					</Grid>
					<Grid item xs={3}>
						<h3>위도 / 경도</h3>
					</Grid>
					<Grid item xs={9}>
						<h4>{info.lat ? `${info.lat} / ${info.lng}` : ''}</h4>
					</Grid>
					<Grid item xs={3}>
						<h3>Tag</h3>
					</Grid>
					<Grid item xs={9}>
						<TagInput data={tagList} onTag={setTagList} />
					</Grid>
				</Grid>
			</div>
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
