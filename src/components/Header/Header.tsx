import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Link, useLocation } from 'react-router-dom';
import { darkModeSelector } from 'store/commonStore';
import 'assets/styles/Header.scss';

const HeaderWrapper = styled.header`
	display: flex;
	position: fixed;
	justify-content: space-between;
	align-items: center;
	z-index: 10;
	width: 100%;
	height: 8%;
	background: ${(props) => props.theme.headerBgColor};
	transition: background 1s;
	&:hover {
		background: ${(props) => props.theme.headerHoverBgColor};
		.mode {
			background-color: white;
		}
	}

	nav {
		a {
			color: ${(props) => props.theme.navItemColor};
			&.active {
				background-color: ${(props) => props.theme.navItemHoverBgColor};
				color: ${(props) => props.theme.navItemHoverColor};
			}
			&:hover {
				background-color: ${(props) => props.theme.navItemHoverBgColor};
				color: ${(props) => props.theme.navItemHoverColor};
				transition: background 1s, color 1s;
			}
		}
	}
`;

const Header = () => {
	const { pathname } = useLocation();
	const [isDarkMode, toggleDarkMode] = useRecoilState(darkModeSelector);

	const locations = [
		{ path: '/map', label: '맵' },
		{ path: '/board', label: '게시판' },
		{ path: '/notice', label: '공지사항' },
		{ path: '/management', label: '나라설정(admin)' },
	];

	return (
		<HeaderWrapper>
			<div className="left-side">
				<Link to="/">
					<img alt="dsa" src={require('assets/images/header_logo.png')} />
				</Link>
				<nav>
					{locations.map(
						(item, index): React.ReactElement => (
							<Link key={`${index}-menu`} className={pathname === item.path ? 'active' : ''} to={item.path}>
								{item.label}
							</Link>
						)
					)}
				</nav>
			</div>
			<button
				type="button"
				className={`mode ${isDarkMode ? 'light' : 'dark'}`}
				onClick={() => toggleDarkMode(isDarkMode)}
				aria-label="다크모드/라이트모드"
			/>
		</HeaderWrapper>
	);
};

export default Header;
