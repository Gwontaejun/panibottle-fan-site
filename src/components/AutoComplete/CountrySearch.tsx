/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import { CountryInfo } from 'types/CountryType';

interface AutoCompleteType {
	place_id: string;
	label: string;
}

interface CountrySearchPropsType {
	onCountrySelect: (data: CountryInfo) => void;
}

const CountrySearch = (props: CountrySearchPropsType) => {
	const { onCountrySelect } = props;
	const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
		apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
	});
	const [autoCompleteList, setAutoCompleteList] = useState<AutoCompleteType[]>([]);

	useEffect(() => {
		// fetch place details for the first element in placePredictions array
		if (placePredictions.length) {
			const placeList = placePredictions
				.filter((item) => item.types[0] === 'country')
				.map((item) => ({
					place_id: item.place_id,
					label: item.description,
				}));
			setAutoCompleteList(placeList);
		}
	}, [placePredictions]);

	const onSelect = (e: React.SyntheticEvent<Element, Event>, value: AutoCompleteType | null) => {
		if (value) {
			placesService?.getDetails({ placeId: value?.place_id }, (place) => {
				onCountrySelect({
					country_code: place.address_components[0].short_name,
					country_name: place.address_components[0].long_name,
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				});
			});
		}
	};

	return (
		<Autocomplete
			disablePortal
			autoHighlight
			blurOnSelect
			options={autoCompleteList}
			onChange={onSelect}
			renderInput={(params) => (
				<TextField
					{...params}
					fullWidth
					placeholder="국가를 검색해주세요."
					onChange={(evt) => {
						getPlacePredictions({ input: evt.target.value, region: 'as' });
					}}
				/>
			)}
		/>
	);
};

export default CountrySearch;
