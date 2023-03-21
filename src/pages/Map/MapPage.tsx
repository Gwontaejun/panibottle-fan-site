import React, { Suspense, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { darkModeState } from 'store/commonStore';
import 'assets/styles/MapPage.scss';
import Map, { MarkerProps, BoundRange } from 'components/Map/Map';

const MapPage = () => {
	const isDarkMode = useRecoilValue(darkModeState);
	const dimRef = useRef<HTMLDivElement>(null);
	const [markers, setMarkers] = useState<MarkerProps[]>([
		// { region: '0', lat: 45.6009055, lng: 126.9485623, text: '12' },
		{ region: '5', lat: 40.6009055, lng: 126.9485623, text: '45' },
	]);

	const onBoundChange = (data: BoundRange) => {
		console.log('data', data);

		setMarkers([
			// { region: '0', lat: 45.6009055, lng: 126.9485623, text: '12' },
			{ region: '5', lat: 40.6009055, lng: 126.9485623, text: '45' },
		]);
	};

	return (
		<div className="map-wrapper">
			<div ref={dimRef} className="map-dim" />

			<div className="map-content">
				<Suspense fallback={<div />}>
					<Map
						isDarkMode={isDarkMode}
						markers={markers}
						defaultBounds={{ lat: 37.6009055, lng: 126.9485623 }}
						onBoundChange={onBoundChange}
					/>
				</Suspense>
			</div>
		</div>
	);
};

export default MapPage;
