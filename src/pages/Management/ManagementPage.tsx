import React, { useState, useEffect } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { countryCollection, videoCollection } from 'firebaseStore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { CountryInfo } from 'types/CountryType';
import 'assets/styles/ManagementPage.scss';

interface VideoInfoType {
	doc_id?: string | undefined;
	index: number;
	country_code: string;
	video_id: string;
}

const ManagementPage = () => {
	// const [countryInfo] = useState<CountryInfoType>({
	// 	country_code: '',
	// 	country_name: '',
	// 	description: '',
	// 	icon_url: '',
	// 	latitude: '',
	// 	longitude: '',
	// 	region: '',
	// });
	const [countryCode] = useState<string>('kr');
	const [videos, setVideos] = useState<VideoInfoType[]>([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const videoObject = await getDocs(query(videoCollection, where('country_code', '==', countryCode)));
		const data: VideoInfoType[] = videoObject.docs.map((item) => {
			const videoData = item.data();
			return {
				doc_id: item.id,
				index: videoData.index,
				country_code: videoData.country_code,
				video_id: videoData.video_id,
			};
		});

		setVideos(data);
	};

	// const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setCountryInfo({ ...countryInfo, [e.target.id]: e.target.value });
	// };

	// const onVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const cloneVideo = [...videos];
	// 	cloneVideo[Number(e.target.id)] = { ...cloneVideo[Number(e.target.id)], video_id: e.target.value };
	// 	setVideos(cloneVideo);
	// };

	// const onVideoPush = () => {
	// 	setVideos([...videos, { index: videos.length, country_code: countryCode, video_id: '' }]);
	// };

	// const onAddVideo = async () => {
	// 	const batch = writeBatch(firestore);

	// 	videos.forEach((item) => {
	// 		if (item.doc_id) {
	// 			batch.update(doc(videoCollection, item.doc_id), {
	// 				index: item.index,
	// 				country_code: countryCode,
	// 				video_id: item.video_id,
	// 			});
	// 		} else {
	// 			batch.set(doc(videoCollection), { index: item.index, country_code: countryCode, video_id: item.video_id });
	// 		}
	// 	});

	// 	await batch.commit();
	// };

	return (
		<div className="management-wrapper">
			<CountryList />
			<div className="list-wrapper">
				<ul>
					{videos.map((item) => (
						<li key={item.index} id={item.index?.toString()}>
							{item.video_id}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const CountryList = () => {
	const [region, setRegion] = useState('as');
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
		<div className="list-wrapper">
			<Tabs value={region} onChange={onRegionChange} variant="fullWidth">
				<Tab className="region-tab" value="as" label="아시아" />
				<Tab className="region-tab" value="eu" label="유럽" />
				<Tab className="region-tab" value="na" label="북미" />
				<Tab className="region-tab" value="sa" label="남미" />
				<Tab className="region-tab" value="oc" label="오세아니아" />
			</Tabs>
			<ul className="country-list">
				{countryList.map((country: CountryInfo) => (
					<ListItem
						secondaryAction={
							<>
								<button style={{ zIndex: 99 }} type="button">
									수정
								</button>
								<button style={{ zIndex: 99 }} type="button">
									삭제
								</button>
							</>
						}
						disablePadding
					>
						<ListItemButton>
							<img src={country.icon_url} alt="이미지" />
							<span>{country.country_name}</span>
						</ListItemButton>
					</ListItem>
				))}
			</ul>
		</div>
	);
};

export default ManagementPage;
