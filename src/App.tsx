import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { darkModeState } from 'store/commonStore';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Header } from 'components';
import MainPage from 'pages/Main/MainPage';
import MapPage from 'pages/Map/MapPage';
import ManagementPage from 'pages/Management/ManagementPage';
import { lightTheme, darkTheme } from 'theme/theme';

const GlobalStyle = createGlobalStyle`
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-thumb {
		height: 17%;
		background-color: ${(props) => props.theme.scrollThumbColor};
		border-radius: 10px;
	}

	::-webkit-scrollbar-track {
		background-color: transparent;
	}

	body {
		color: ${(props) => props.theme.commonColor};
		background-color: ${(props) => props.theme.commonBgColor};
		transition: all 1s;
	}
`;

const ContentSection = styled.div`
	height: 92%;
	width: 100%;
	position: absolute;
	top: 8%;
`;

const ThemePage = () => {
	const isDarkMode = useRecoilValue(darkModeState);

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<GlobalStyle theme={isDarkMode ? darkTheme : lightTheme} />
			<Header />
			<ContentSection>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/map" element={<MapPage />} />
					<Route path="/management" element={<ManagementPage />} />
				</Routes>
			</ContentSection>
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
