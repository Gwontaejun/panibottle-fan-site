import React from 'react';
import GoogleMapReact from 'google-map-react-concurrent';
import { lightMode, darkMode } from './MapStyles';
import { Bounds, CountryInfo } from 'types/CountryType';
import _ from 'lodash';

import 'assets/styles/Map.scss';

interface MapProps {
	isDarkMode: boolean;
	defaultBounds: Bounds;
	markers: MarkerProps[];
	onClickMarker: (data: MarkerProps) => void;
}

export interface MarkerProps extends CountryInfo {
	onClickMarker?: (data: MarkerProps) => void;
}

const Map = (props: MapProps) => {
	const { isDarkMode, defaultBounds, markers, onClickMarker } = props;

	const renderMarker = () =>
		markers.map((item, index) => (
			// GoogleMapReact에서 지원하는 children에 lat, lng값이 필요.
			// 마커 컴포넌트 내부에선 lat, lng값을 사용하지 않기때문에 ignore처리
			// eslint-disable-next-line react/jsx-props-no-spreading
			<Marker {...item} key={`marker-${index}`} onClickMarker={onClickMarker} />
		));

	return (
		<GoogleMapReact
			bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
			options={{
				styles: isDarkMode ? darkMode : lightMode,
				fullscreenControl: false,
			}}
			defaultCenter={defaultBounds}
			defaultZoom={7}
			// onGoogleApiLoaded={({ map }) => onMapApis(map)}
			yesIWantToUseGoogleMapApiInternals
		>
			{renderMarker()}
		</GoogleMapReact>
	);
};

const Marker = React.memo(
	(props: MarkerProps) => {
		const { country_name: name, region, lat, lng, icon_url: icon } = props;
		const onMarkerClick = () => {
			props.onClickMarker?.(props);
		};

		return (
			<button type="button" className="marker-wrapper" onClick={onMarkerClick}>
				<div className={`marker region-${region}`} aria-label={`${lat}, ${lng}`}>
					{/* <div>{props?.text}</div> */}
					<img src={icon} alt={name} />
				</div>
			</button>
		);
	},
	(prevProps, nextProps) => {
		const prev = _.pick(prevProps, ['lat', 'lng']);
		const next = _.pick(nextProps, ['lat', 'lng']);

		return _.isEqual(prev, next);
	}
);

export default Map;
