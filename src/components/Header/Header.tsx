import React, { useState } from 'react';
import 'assets/styles/Header.scss';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
	const { pathname } = useLocation();
	const [flag, setFlag] = useState(false);

	const locations = [
		{ path: '/map', label: '맵' },
		{ path: '/board', label: '게시판' },
	];

	return (
		<header>
			<div className="left-side">
				<Link to="/">
					<img alt="dsa" src={require('assets/images/header_logo.png')} />
				</Link>
				<nav>
					{locations.map(
						(item): React.ReactElement => (
							<Link className={pathname === item.path ? 'active' : ''} to={item.path}>
								{item.label}
							</Link>
						)
					)}
				</nav>
			</div>
			<button
				type="button"
				className={`mode ${flag ? 'light' : 'dark'}`}
				onClick={() => setFlag(!flag)}
				aria-label="다크모드/라이트모드"
			/>
		</header>
	);
};

export default Header;
