import React, { useMemo } from 'react';
import GoogleMapReact from 'google-map-react-concurrent';
import { lightMode, darkMode } from './MapStyles';
import _ from 'lodash';

import 'assets/styles/Map.scss';

interface Bounds {
	lat: number;
	lng: number;
}

interface MapProps {
	isDarkMode: boolean;
	defaultBounds: Bounds;
	markers: MarkerProps[];
}

export interface MarkerProps extends Bounds {
	text: string;
	icon_url: string;
	region: string;
}

const Map = (props: MapProps) => {
	const { isDarkMode, defaultBounds, markers } = props;

	const renderMarker = useMemo(
		() =>
			markers.map((item, index) => (
				// GoogleMapReact에서 지원하는 children에 lat, lng값이 필요.
				// 마커 컴포넌트 내부에선 lat, lng값을 사용하지 않기때문에 ignore처리
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Marker {...item} key={`marker-${index}`} />
			)),
		[markers]
	);

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
			{renderMarker}
		</GoogleMapReact>
	);
};

const Marker = React.memo(
	(props: MarkerProps) => (
		<div className="marker-wrapper">
			<div className={`marker region-${props?.region}`} aria-label={`${props?.lat}, ${props?.lng}`}>
				{/* <div>{props?.text}</div> */}
				<img src={props?.icon_url} alt={props?.text} />
			</div>
		</div>
	),
	(prevProps, nextProps) => {
		const prev = _.pick(prevProps, ['lat', 'lng']);
		const next = _.pick(nextProps, ['lat', 'lng']);

		return _.isEqual(prev, next);
	}
);

export default Map;
