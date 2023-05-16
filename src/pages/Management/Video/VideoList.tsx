/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useRef, useState, useEffect } from 'react';

// state, service
import { doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import firestore, { videoCollection } from 'firebaseStore';

// component or style
import ThemeButton from 'components/Button/Button';
import { ListAddButton, ListDeleteButton, ListEditButton } from 'components/Button/IconButton';
import styled, { css } from 'styled-components';

// other library (util or component)
import { ReactSortable } from 'react-sortablejs';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { sortBy } from 'lodash';

interface VideoInfoType {
	doc_id?: string | undefined;
	index: number;
	country_code: string;
	video_id: string;
	description: string;
}

interface SortableList extends VideoInfoType {
	id: number;
	name: string | undefined;
}

const ThemeThreeLine = styled(ListItemText)`
	width: 24px;
	height: 24px;
	background: url(${(props) => props.theme.threeLineIcon}) no-repeat center;
	flex-grow: 0.1 !important;
	cursor: grab;
`;

const VideoList = (props: { countryCode: string | undefined }) => {
	const { countryCode } = props;
	const deleteList = useRef<string[]>([]);
	const [videos, setVideos] = useState<VideoInfoType[]>([]);

	useEffect(() => {
		loadData();
	}, [countryCode]);

	const loadData = async () => {
		const videoObject = await getDocs(query(videoCollection, where('country_code', '==', countryCode)));
		const data: VideoInfoType[] = videoObject.docs.map((item) => {
			const videoData = item.data();
			return {
				doc_id: item.id,
				index: videoData.index,
				country_code: videoData.country_code,
				video_id: videoData.video_id,
				description: videoData.description,
			};
		});

		setVideos(sortBy(data, 'index'));
	};

	const onChangeOrder = (list: SortableList[]) => {
		// index 변경
		const orderList = list.map((item: SortableList, index: number) => ({
			...item,
			index,
		}));

		setVideos(orderList);
	};

	const onDeleteVideos = (id: string) => {
		const findVideo = videos.find((item) => item.video_id === id);
		if (findVideo?.doc_id) {
			deleteList.current.push(findVideo?.doc_id);
		}

		const deleteOrderList = videos.filter((item) => item.video_id !== id).map((video, index) => ({ ...video, index }));
		setVideos(deleteOrderList);
	};

	const onApply = async () => {
		const batch = writeBatch(firestore);

		videos.forEach((item) => {
			if (item.doc_id) {
				batch.update(doc(videoCollection, item.doc_id), {
					index: item.index,
					country_code: countryCode,
					video_id: item.video_id,
				});
			} else {
				batch.set(doc(videoCollection), { index: item.index, country_code: countryCode, video_id: item.video_id });
			}
		});

		if (deleteList.current.length) {
			deleteList.current.forEach((id) => {
				batch.delete(doc(videoCollection, id));
			});
		}

		await batch.commit();
	};

	return (
		<div className="management-content">
			<div className="content-header">
				<h2>국가별 영상</h2>
			</div>
			<div
				className="content-body"
				css={css`
					border: 1px solid ${(props) => props.theme.commonColor};
				`}
			>
				<div className="list-wrapper">
					{countryCode ? (
						<ReactSortable
							tag="ul"
							className="list video-list"
							list={videos.map((item): SortableList => ({ ...item, id: item.index, name: item.doc_id }))}
							setList={onChangeOrder}
							animation={300}
							handle=".dragHandle"
							ghostClass=".list-button"
							onMove={(e) => !e.related.classList.contains('add-list')}
						>
							{videos.map((item: VideoInfoType, index: number) => (
								<ListItem
									key={index}
									className="list-button"
									secondaryAction={
										<div style={{ display: 'flex' }}>
											<ListEditButton style={{ zIndex: 99 }} />
											<ListDeleteButton style={{ zIndex: 99 }} onClick={() => onDeleteVideos(item.video_id)} />
										</div>
									}
									disablePadding
								>
									<ThemeThreeLine className="dragHandle" />
									<ListItemText className="list-text" disableTypography>
										{item.video_id} ({item.description})
									</ListItemText>
								</ListItem>
							))}
							<ListItem className="list-button add-list" disablePadding>
								<ListAddButton />
							</ListItem>
						</ReactSortable>
					) : (
						<div className="list video-list empty">국가를 선택해주세요.</div>
					)}
				</div>
				<div className="btn-box">
					<ThemeButton type="button" className="outline" onClick={() => loadData()} disabled={!countryCode}>
						초기화
					</ThemeButton>
					<ThemeButton type="button" onClick={onApply} disabled={!countryCode}>
						적용
					</ThemeButton>
				</div>
			</div>
		</div>
	);
};

export default VideoList;
