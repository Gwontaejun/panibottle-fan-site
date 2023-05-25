import React, { useRef, useState } from 'react';

// state, service
import { doc, setDoc } from 'firebase/firestore';
import { countryCollection, fireStorage } from 'firebaseStore';
import { ref, uploadBytes } from 'firebase/storage';

// component or style
import Popup, { PopupHooks } from 'components/Popup/Popup';
import Button from 'components/Button/Button';
import CountrySearch from 'components/AutoComplete/CountrySearch';
import TagInput from 'components/TagInput/TagInput';

// other library (util or component)
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';

// type
import { CountryInfo } from 'types/CountryType';

const defaultIcon = require('assets/images/icon_question.svg').default;

interface CountryPopupProps {
	popupHooks: PopupHooks;
	countryList: CountryInfo[];
	apply: () => void;
}

const CountryInfoPopup = (props: CountryPopupProps) => {
	const { popupHooks, countryList, apply } = props;
	const { enqueueSnackbar } = useSnackbar();
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

	const onApply = async (): Promise<undefined> => {
		const file = fileRef.current?.files?.[0];

		if (!file) {
			enqueueSnackbar('아이콘을 등록해주세요.', { variant: 'error' });
			return;
		}
		if (!info.country_code) {
			enqueueSnackbar('국가를 입력해주세요.', { variant: 'error' });
			return;
		}

		const findCountry = countryList.find((item) => item.country_code.toUpperCase() === info.country_code.toUpperCase());
		if (findCountry) {
			enqueueSnackbar('등록에 실패했습니다.', { variant: 'error' });
			return;
		}

		try {
			const iconFormat = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();
			const storageRef = ref(fireStorage, `country/${info.country_code}-icon.${iconFormat}`);

			const { metadata } = await uploadBytes(storageRef, file);

			const imageURL = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/${metadata.fullPath.replace(
				'/',
				'%2f'
			)}?alt=media`;

			await setDoc(doc(countryCollection), {
				country_code: info.country_code,
				country_name: info.country_name,
				icon_url: imageURL,
				latitude: info.lat,
				longitude: info.lng,
				tags: tagList,
			});
			enqueueSnackbar('등록에 성공했습니다.', { variant: 'success' });

			apply();
			popupHooks.toggle();
		} catch (e) {
			console.log('초비상 에러 발생!!!', e);
		}
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
				<Button type="button" onClick={onApply}>
					적용
				</Button>
			</div>
		</Popup>
	);
};

export default CountryInfoPopup;
