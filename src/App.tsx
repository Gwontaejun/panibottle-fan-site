import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { darkModeState } from 'store/commonStore';
import { ThemeProvider } from 'styled-components';
import { Header } from 'components';
import MainPage from 'pages/Main/MainPage';
import MapPage from 'pages/Map/MapPage';
import ManagementPage from 'pages/Management/ManagementPage';
import { lightTheme, darkTheme } from 'theme/theme';

const ThemePage = () => {
	const isDarkMode = useRecoilValue(darkModeState);

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<Header />
			<section>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/map" element={<MapPage />} />
					<Route path="/management" element={<ManagementPage />} />
				</Routes>
			</section>
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
