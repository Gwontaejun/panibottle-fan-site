import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/styles/MainPage.scss';

const MainPage = () => {
	const navigate = useNavigate();
	const startRef = useRef<HTMLButtonElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

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
		<div ref={mainRef} className="main-wrapper">
			<div className="main-content">
				<button ref={startRef} type="button" className="btn-start" aria-label="시작하기 버튼" onClick={onClickStart} />
				<div className="btn-start-effect" />
			</div>
			<div className="bottom-cloudy" />
		</div>
	);
};

export default MainPage;
