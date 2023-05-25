import React from 'react';

// state, service
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { darkModeState } from 'store/commonStore';

// component or style
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

	input::-webkit-input-placeholder {
		color: ${(props) => props.theme.commonColor};
	}

	.MuiInputBase-root {
		color: ${(props) => props.theme.commonColor} !important;
		fieldset {
			border-color: ${(props) => props.theme.commonColor} !important;
		}
	}

	.MuiChip-root {
		margin: 0 0.5rem 0.5rem 0 !important;
		color: ${(props) => props.theme.commonColor} !important;
		border-color: ${(props) => props.theme.commonColor} !important;
		svg {
			color: ${(props) => props.theme.commonColor} !important;
		}
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
