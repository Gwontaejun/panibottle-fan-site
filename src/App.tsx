import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/Main/MainPage';
import MapPage from 'pages/Map/MapPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/map" element={<MapPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
