import styled from 'styled-components';
import { Button } from '@mui/material';

const ThemeButton = styled(Button)`
	cursor: pointer;
	background-color: ${(props) => props.theme.popupButtonBgColor} !important;
	color: ${(props) => props.theme.popupButtonColor} !important;

	&:hover,
	&:focus {
		opacity: 0.7;
	}

	&.outline {
		background-color: ${(props) => props.theme.popupButtonColor} !important;
		color: ${(props) => props.theme.popupButtonBgColor} !important;

		&:hover,
		&:focus {
			background-color: rgba(0, 0, 0, 0.04);
		}
	}
`;

export default ThemeButton;
