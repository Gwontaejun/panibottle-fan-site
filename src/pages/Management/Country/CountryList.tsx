/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';

// state, service
import { getDocs } from 'firebase/firestore';
import { countryCollection } from 'firebaseStore';

// component or style
import { ListAddButton, ListDeleteButton, ListEditButton } from 'components/Button/IconButton';
import styled, { css } from 'styled-components';
import { usePopup } from 'hooks';
import CountryInfoPopup from './CountryInfoPopup';

// other library (util or component)
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

// type
import { CountryInfo } from 'types/CountryType';

const ThemeListItemButton = styled(ListItemButton)`
	&.on {
		&:before {
			content: '';
			display: inline-block;
			position: absolute;
			width: 24px;
			height: 24px;
			background: url(${(props) => props.theme.checkIcon});
		}
	}
`;

const CountryList = (props: { countryCode: string | undefined; onSelectCountry: (string) => void }) => {
	const { countryCode, onSelectCountry } = props;
	const countryInfoPopup = usePopup();
	const [countryList, setCountryList] = useState<CountryInfo[]>([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const countryObject = await getDocs(countryCollection);

		const result: CountryInfo[] = countryObject.docs.map((item): CountryInfo => {
			const data = item.data();

			return {
				doc_id: item.id,
				icon_url: data.icon_url,
				country_name: data.country_name,
				country_code: data.country_code,
				lat: data.latitude,
				lng: data.longitude,
			};
		});
		setCountryList(result);
	};

	return (
		<>
			<div className="management-content">
				<div className="content-header">
					<h2>국가</h2>
				</div>
				<div
					className="content-body"
					css={css`
						border: 1px solid ${(props) => props.theme.commonColor};
					`}
				>
					<div className="list-wrapper">
						<ul className="list">
							{countryList.map((country: CountryInfo, index) => (
								<ListItem
									key={`country-${index}`}
									secondaryAction={
										<div style={{ display: 'flex' }}>
											<ListEditButton style={{ zIndex: 99 }} />
											<ListDeleteButton style={{ zIndex: 99 }} />
										</div>
									}
									disablePadding
								>
									<ThemeListItemButton
										className={`list-button ${countryCode === country.country_code ? 'on' : ''}`}
										onClick={() => onSelectCountry(country.country_code)}
									>
										<img src={country.icon_url} alt="이미지" />
										<span>{country.country_name}</span>
									</ThemeListItemButton>
								</ListItem>
							))}
							<ListItem className="list-button" disablePadding>
								<ListAddButton onClick={() => countryInfoPopup.toggle()} />
							</ListItem>
						</ul>
					</div>
				</div>
			</div>
			{countryInfoPopup.isShowing && <CountryInfoPopup popupHooks={countryInfoPopup} />}
		</>
	);
};

export default CountryList;
