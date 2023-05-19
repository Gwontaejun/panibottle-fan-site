import React from 'react';
import { Chip, TextField } from '@mui/material';
import styled from 'styled-components';

interface TagInputPropsType {
	data: string[];
	onTag: (data: string[]) => void;
}

const TagTextField = styled(TextField)`
	margin-bottom: 1rem !important;
`;

const TagInput = (props: TagInputPropsType) => {
	const { data, onTag } = props;

	const onKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement;

		if (e.key === 'Enter' && targetElement.value.length > 0) {
			onTag([...data, targetElement.value]);
			targetElement.value = '';
		}
	};

	const tagElement = (list) => {
		const chipData = [...list];

		return list.map((item, index) => (
			<Chip
				key={`Tag-${index}`}
				label={item}
				variant="outlined"
				onDelete={() => {
					chipData.splice(index, 1);
					onTag(chipData);
				}}
			/>
		));
	};

	return (
		<>
			<TagTextField fullWidth placeholder="태그를 입력해주세요." onKeyUp={onKeyEvent} />
			{tagElement(data)}
		</>
	);
};

export default TagInput;
