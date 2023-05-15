/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ReactSortable } from 'react-sortablejs';
import { doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import firestore, { countryCollection, videoCollection } from 'firebaseStore';
import ThemeButton from 'components/Button/ThemeButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import 'assets/styles/ManagementPage.scss';

import { CountryInfo } from 'types/CountryType';

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

const ThemeTabs = styled(Tabs)`
	.MuiTab-root {
		color: ${(props) => props.theme.commonColor} !important;
		font-family: 'defaultFont';
		font-size: 1rem;
		font-weight: 700;
	}

	.MuiTabs-indicator {
		background-color: ${(props) => props.theme.commonColor};
	}
`;

const ThemeListItemButton = styled(ListItemButton)`
	&.on {
		&:before {
			content: '';
			display: inline-block;
			position: absolute;
			width: 24px;
			height: 24px;
			background: url(${(props) => props.theme.checkIcon});
		}
	}
`;

const ThemeThreeLine = styled(ListItemText)`
	width: 24px;
	height: 24px;
	background: url(${(props) => props.theme.threeLineIcon}) no-repeat center;
	flex-grow: 0.1 !important;
	cursor: grab;
`;

const IconButton = styled(ListItemButton)`
	width: 40px;
	height: 40px;
	background-size: 40px !important;
	transition: background 0.3s !important;
`;

const ThemeEditButton = styled(IconButton)`
	background: url(${(props) => props.theme.editIcon}) no-repeat center;
`;

const ThemeDeleteButton = styled(IconButton)`
	background: url(${(props) => props.theme.deleteIcon}) no-repeat center;
`;

const AddListButton = styled(IconButton)`
	height: 100%;
	background: url(${(props) => props.theme.addIcon}) no-repeat center;
`;

const ManagementPage = () => {
	const [countryCode, setCountryCode] = useState<string | undefined>(undefined);

	return (
		<div className="management-wrapper">
			<CountryList countryCode={countryCode} onSelectCountry={(code: string) => setCountryCode(code)} />
			<VideoList countryCode={countryCode} />
		</div>
	);
};

const CountryList = (props: { countryCode: string | undefined; onSelectCountry: (string) => void }) => {
	const { countryCode, onSelectCountry } = props;
	const [region, setRegion] = useState<string>('as');
	const [countryList, setCountryList] = useState<CountryInfo[]>([]);

	useEffect(() => {
		loadData();
	}, [region]);

	const loadData = async () => {
		const countryObject = await getDocs(query(countryCollection, where('region', '==', region)));

		const result: CountryInfo[] = countryObject.docs.map((item): CountryInfo => {
			const data = item.data();

			return {
				doc_id: item.id,
				icon_url: data.icon_url,
				country_name: data.country_name,
				country_code: data.country_code,
				lat: data.latitude,
				lng: data.longitude,
			};
		});
		setCountryList(result);
	};

	const onRegionChange = (e: React.BaseSyntheticEvent, tabValue: string) => {
		setRegion(tabValue);
	};

	return (
		<div className="management-content">
			<div className="content-header">
				<h2>나라</h2>
			</div>
			<div
				className="content-body"
				css={css`
					border: 1px solid ${(props) => props.theme.commonColor};
				`}
			>
				<div className="list-wrapper">
					<ThemeTabs value={region} onChange={onRegionChange} variant="fullWidth">
						<Tab className="region-tab" value="as" label="아시아" />
						<Tab className="region-tab" value="eu" label="유럽" />
						<Tab className="region-tab" value="na" label="북미" />
						<Tab className="region-tab" value="sa" label="남미" />
						<Tab className="region-tab" value="oc" label="오세아니아" />
					</ThemeTabs>
					<ul className="list">
						{countryList.map((country: CountryInfo, index) => (
							<ListItem
								key={`country-${index}`}
								secondaryAction={
									<div style={{ display: 'flex' }}>
										<ThemeEditButton style={{ zIndex: 99 }} />
										<ThemeDeleteButton style={{ zIndex: 99 }} />
									</div>
								}
								disablePadding
							>
								<ThemeListItemButton
									className={`list-button ${countryCode === country.country_code ? 'on' : ''}`}
									onClick={() => onSelectCountry(country.country_code)}
								>
									<img src={country.icon_url} alt="이미지" />
									<span>{country.country_name}</span>
								</ThemeListItemButton>
							</ListItem>
						))}
						<ListItem className="list-button" disablePadding>
							<AddListButton />
						</ListItem>
					</ul>
				</div>
				<div className="btn-box">
					<ThemeButton type="button" className="outline">
						초기화
					</ThemeButton>
					<ThemeButton type="button">적용</ThemeButton>
				</div>
			</div>
		</div>
	);
};

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

		setVideos(data);
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
				<h2>나라별 영상</h2>
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
											<ThemeEditButton style={{ zIndex: 99 }} />
											<ThemeDeleteButton style={{ zIndex: 99 }} onClick={() => onDeleteVideos(item.video_id)} />
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
								<AddListButton />
							</ListItem>
						</ReactSortable>
					) : (
						<div className="list video-list empty">나라를 선택해주세요.</div>
					)}
				</div>
				<div className="btn-box">
					<ThemeButton type="button" className="outline" disabled={!countryCode}>
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

export default ManagementPage;
