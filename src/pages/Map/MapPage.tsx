import React, { useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapStylesheet from './MapStylesheet.json';
import 'assets/styles/MapPage.scss';

const MapPage = () => {
	const dimRef = useRef<HTMLDivElement>(null);
	useEffect(() => {}, []);

	return (
		<div className="map-wrapper">
			<div ref={dimRef} className="map-dim">
				<div className="stamp stamp1" />
				<div className="stamp stamp2" />
				<div className="stamp stamp3" />
			</div>

			<div className="map-content">
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
					options={{
						styles: MapStylesheet,
					}}
					defaultCenter={{ lat: 37.6009055, lng: 126.9485623 }}
					defaultZoom={1}
				/>
			</div>
		</div>
	);
};

export default MapPage;
