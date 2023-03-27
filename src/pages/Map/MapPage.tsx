import React, { Suspense, useRef, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { darkModeState } from 'store/commonStore';
import Map, { MarkerProps, BoundRange } from 'components/Map/Map';
import 'assets/styles/MapPage.scss';

const MapPage = () => {
	const isDarkMode = useRecoilValue(darkModeState);
	const dimRef = useRef<HTMLDivElement>(null);
	const [markers, setMarkers] = useState<MarkerProps[]>([
		{ region: '5', lat: 37.6009055, lng: 126.9485623, text: '45' },
	]);

	useEffect(() => {
		firebaseLoad();
	}, []);

	const firebaseLoad = async () => {
		const firebaseConfig = {
			apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
			authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
			projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
			storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.REACT_APP_FIREBASE_APP_ID,
			measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
		};

		initializeApp(firebaseConfig);
		const firestore = getFirestore();
		const docRef = collection(firestore, 'country');
		const docSnap = await getDocs(docRef);
		docSnap.forEach((item) => console.log('item', item.data()));
	};

	const onBoundChange = (data: BoundRange) => {
		console.log('data', data);

		setMarkers([{ region: '5', lat: 37.6009055, lng: 126.9485623, text: '45' }]);
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
