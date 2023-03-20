import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import MainPage from 'pages/Main/MainPage';
import MapPage from 'pages/Map/MapPage';
import { darkModeState } from 'store/commonStore';
import { lightTheme, darkTheme } from 'theme/theme';

const ThemePage = () => {
	const isDarkMode = useRecoilValue(darkModeState);

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<Header />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/map" element={<MapPage />} />
			</Routes>
		</ThemeProvider>
	);
};

function App() {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<ThemePage />
			</RecoilRoot>
		</BrowserRouter>
	);
}

export default App;
