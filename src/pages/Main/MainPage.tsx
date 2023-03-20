import React, { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { darkModeState } from 'store/commonStore';
import 'assets/styles/MainPage.scss';

const MainWrapper = styled.div`
	width: 100%;
	height: 100%;
	&.dim {
		&:before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			animation: dim-ani 0.5s;
			animation-fill-mode: forwards;
			z-index: 4;
		}
	}
`;

const MainContent = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.bgColor};
	transition: background-color 1s;
`;

const MainPage = () => {
	const navigate = useNavigate();
	const startRef = useRef<HTMLButtonElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);
	const isDarkMode = useRecoilValue(darkModeState);

	useEffect(() => {
		if (isDarkMode) {
			renderStar();
		}
	}, [isDarkMode]);

	const renderStar = () => {
		const stars = document.querySelector('.stars');

		// 브라우저 창의 가로, 세로 중 가장 큰 크기
		const maxSize = Math.max(window.innerWidth, window.innerHeight);

		// 랜덤한 X 위치 값
		const getRandomX = () => Math.random() * maxSize;

		// 랜덤한 Y 위치 값
		const getRandomY = () => Math.random() * maxSize;

		// 랜덤한 크기 (circle는 반지름이 크기)
		const randomRadius = () => Math.random() * 0.7 + 0.6;

		const htmlDummy = new Array(300)
			.fill(null)
			.map(
				() => `<circle class='star'
			  cx=${getRandomX()}
			  cy=${getRandomY()}
			  r=${randomRadius()}
			  className="star" />`
			)
			.join('');

		if (stars) {
			stars.innerHTML = htmlDummy;
		}
	};

	const onClickStart = () => {
		startRef.current?.classList.add('click');
		document.querySelector('.btn-start-effect')?.remove();

		setTimeout(() => {
			mainRef.current?.classList.add('dim');
			setTimeout(() => {
				navigate('/map');
			}, 1000);
		}, 3000);
	};

	return (
		<MainWrapper ref={mainRef}>
			<MainContent>
				{isDarkMode && <svg className="stars" />}
				<button ref={startRef} type="button" className="btn-start" aria-label="시작하기 버튼" onClick={onClickStart} />
				<div className="btn-start-effect" />
			</MainContent>
			<div className="bottom-cloudy" />
		</MainWrapper>
	);
};

export default MainPage;
