import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
	height: 90%;

	&.no-ready {
		.slick-list {
			&:before {
				content: '';
				display: block;
				z-index: 99;
				width: 100%;
				height: 100%;
				background: ${(props) => props.theme.skeletonColor};
			}
		}
	}

	.slick-list {
		left: 0;
		right: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		border-radius: 30px;
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
		width: 3rem;
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
			border-left: 20px solid ${(props) => props.theme.carouselArrowColor};
			border-top: 20px solid transparent;
			border-bottom: 20px solid transparent;
		}
	}

	.slick-prev {
		transform: rotate(180deg);
		top: 0;
		left: -3rem;
	}

	.slick-next {
		right: -3rem;
	}
`;

const Carousel = (props: { isReady: boolean; children?: JSX.Element[] }) => (
	<StyledSlider
		className={`carousel ${props?.isReady ? '' : 'no-ready'}`}
		centerMode
		centerPadding={0}
		infinite
		speed={500}
		slidesToShow={1}
	>
		{props?.children}
	</StyledSlider>
);

export default Carousel;
