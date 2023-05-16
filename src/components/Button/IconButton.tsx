import styled from 'styled-components';
import ListItemButton from '@mui/material/ListItemButton';

const IconButton = styled(ListItemButton)`
	width: 40px;
	height: 40px;
	background-size: 40px !important;
	transition: background 0.3s !important;
`;

export const ListEditButton = styled(IconButton)`
	background: url(${(props) => props.theme.editIcon}) no-repeat center;
`;

export const ListDeleteButton = styled(IconButton)`
	background: url(${(props) => props.theme.deleteIcon}) no-repeat center;
`;

export const ListAddButton = styled(IconButton)`
	height: 100%;
	background: url(${(props) => props.theme.addIcon}) no-repeat center;
`;
