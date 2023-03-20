import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import GoogleMapReact from 'google-map-react';
import { darkModeState } from 'store/commonStore';
import { lightMode, darkMode } from './MapStyles';
import 'assets/styles/MapPage.scss';

const MapPage = () => {
	const isDarkMode = useRecoilValue(darkModeState);
	const dimRef = useRef<HTMLDivElement>(null);

	return (
		<div className="map-wrapper">
			<div ref={dimRef} className="map-dim" />

			<div className="map-content">
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
					options={{
						styles: isDarkMode ? darkMode : lightMode,
						fullscreenControl: false,
					}}
					defaultCenter={{ lat: 37.6009055, lng: 126.9485623 }}
					defaultZoom={1}
				/>
			</div>
		</div>
	);
};

export default MapPage;
