import styled from 'styled-components';

const ThemeButton = styled.button`
	cursor: pointer;
	background-color: ${(props) => props.theme.popupButtonBgColor};
	color: ${(props) => props.theme.popupButtonColor};
`;

export default ThemeButton;;