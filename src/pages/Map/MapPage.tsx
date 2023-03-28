import React, { Suspense, useRef, useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { countryCollection } from 'firebaseStore';
import { useRecoilValue } from 'recoil';
import { darkModeState } from 'store/commonStore';
import Map, { MarkerProps } from 'components/Map/Map';
import 'assets/styles/MapPage.scss';

const MapPage = () => {
	const dimRef = useRef<HTMLDivElement>(null);
	const isDarkMode = useRecoilValue(darkModeState);
	const [markers, setMarkers] = useState<MarkerProps[]>([]);

	useEffect(() => {
		// eslint-disable-next-line no-multi-assign, no-console
		console.warn = console.error = () => {};
		loadData();
	}, []);

	const loadData = async () => {
		const docSnap = await getDocs(countryCollection);
		let mapList: MarkerProps[] = [];
		docSnap.forEach((item) => {
			const value = item.data();
			mapList = mapList.concat({
				text: value.country_name,
				icon_url: value.icon_url,
				region: value.region,
				lat: value.latitude,
				lng: value.longitude,
			});
		});

		setMarkers(mapList);
	};

	return (
		<div className="map-wrapper">
			<div ref={dimRef} className="map-dim" />

			<div className="map-content">
				<Suspense fallback={<div />}>
					<Map isDarkMode={isDarkMode} markers={markers} defaultBounds={{ lat: 37.6009055, lng: 126.9485623 }} />
				</Suspense>
			</div>
		</div>
	);
};

export default MapPage;
