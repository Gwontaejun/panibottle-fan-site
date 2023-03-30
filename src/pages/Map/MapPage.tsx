import React, { Suspense, useRef, useState, useEffect } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { countryCollection, videoCollection } from 'firebaseStore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { darkModeState } from 'store/commonStore';
import { countryInfo, countryVideo } from 'store/mapStore';
import { Map } from 'components';
import { usePopup } from 'hooks';
import CountryPopup from './CountryPopup';
import 'assets/styles/MapPage.scss';

// 맵 Props Interface
import { MarkerProps } from 'components/Map/Map';

const MapPage = () => {
	const countryPopup = usePopup();
	const dimRef = useRef<HTMLDivElement>(null);
	const isDarkMode = useRecoilValue(darkModeState);
	const setCountryInfo = useSetRecoilState(countryInfo);
	const setCountryVideos = useSetRecoilState(countryVideo);
	const [markers, setMarkers] = useState<MarkerProps[]>([]);

	useEffect(() => {
		// eslint-disable-next-line no-multi-assign, no-console
		console.warn = console.error = () => {};
		loadData();
	}, []);

	const loadData = async () => {
		const docData = await getDocs(countryCollection);
		let mapList: MarkerProps[] = [];
		docData.forEach((item) => {
			const value = item.data();
			mapList = mapList.concat({
				...value,
				country_code: value.country_code,
				country_name: value.country_name,
				icon_url: value.icon_url,
				region: value.region,
				lat: value.latitude,
				lng: value.longitude,
				description: value.description,
			});
		});

		setMarkers(mapList);
	};

	const onClickMarker = async (data: MarkerProps): Promise<void> => {
		const docData = await getDocs(query(videoCollection, where('country_code', '==', data.country_code)));
		const videoIds = docData.docs.map((item) => item.data().video_id);
		setCountryInfo(data);
		setCountryVideos(videoIds);
		countryPopup.toggle();
	};

	return (
		<>
			<div className="map-wrapper">
				<div ref={dimRef} className="map-dim" />

				<div className="map-content">
					<Suspense fallback={<div />}>
						<Map
							isDarkMode={isDarkMode}
							markers={markers}
							defaultBounds={{ lat: 37.6009055, lng: 126.9485623 }}
							onClickMarker={onClickMarker}
						/>
					</Suspense>
				</div>
			</div>
			<CountryPopup popupHooks={countryPopup} />
		</>
	);
};

export default MapPage;
