import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
	height: 90%;

	.slick-list {
		left: 0;
		right: 0;
		margin: auto;
		width: calc(100% - 4rem);
		height: 100%;
	}

	.slick-track {
		width: 100%;
		height: 100%;
	}

	.slick-slide {
		height: 100%;

		div {
			height: 100%;
		}
	}

	.slick-arrow {
		display: block;
		position: absolute;
		width: 2rem;
		height: 100%;

		&:before {
			content: '';
			display: block;
			position: relative;
			margin: 0 auto;
			left: 20%;
			width: 0;
			height: 0;
			border-right: 10px solid transparent;
			border-left: 20px solid black;
			border-top: 20px solid transparent;
			border-bottom: 20px solid transparent;
		}
	}

	.slick-prev {
		transform: rotate(180deg);
		top: 0;
		left: 0;
	}

	.slick-next {
		right: 0;
	}
`;

const Carousel = (props: { children?: JSX.Element[] }) => (
	<StyledSlider
		className="carousel"
		centerMode
		centerPadding={0}
		infinite
		speed={500}
		slidesToShow={1}
		// arrows={false}
	>
		{props?.children}
	</StyledSlider>
);

export default Carousel;
