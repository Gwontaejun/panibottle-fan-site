import styled from 'styled-components';
import { Button } from '@mui/material';

const ThemeButton = styled(Button)`
	cursor: pointer;
	background-color: ${(props) => props.theme.buttonBgColor} !important;
	color: ${(props) => props.theme.buttonColor} !important;
	outline-color: ${(props) => props.theme.commonColor} !important;

	&:hover,
	&:focus {
		opacity: 0.7;
	}

	&.outline {
		background-color: transparent !important;
		color: ${(props) => props.theme.commonColor} !important;
	}
`;

export default ThemeButton;
