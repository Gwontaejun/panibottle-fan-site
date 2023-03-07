import React, { useRef, useEffect } from 'react';
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

			<div className="map-content">DDDD</div>
		</div>
	);
};

export default MapPage;
