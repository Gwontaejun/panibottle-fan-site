import React, { useState, useEffect } from 'react';
import { writeBatch, doc, getDocs, query, where } from 'firebase/firestore';
import firestore, { videoCollection } from 'firebaseStore';

interface CountryInfoType {
	country_code: string | undefined;
	country_name: string | undefined;
	description: string | undefined;
	icon_url: string | undefined;
	latitude: string | undefined;
	longitude: string | undefined;
	region: string | undefined;
}

interface VideoInfoType {
	doc_id?: string | undefined;
	index: number;
	country_code: string;
	video_id: string;
}

const ManagementPage = () => {
	const [countryInfo, setCountryInfo] = useState<CountryInfoType>({
		country_code: '',
		country_name: '',
		description: '',
		icon_url: '',
		latitude: '',
		longitude: '',
		region: '',
	});
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

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountryInfo({ ...countryInfo, [e.target.id]: e.target.value });
	};

	const onVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const cloneVideo = [...videos];
		cloneVideo[Number(e.target.id)] = { ...cloneVideo[Number(e.target.id)], video_id: e.target.value };
		setVideos(cloneVideo);
	};

	const onVideoPush = () => {
		setVideos([...videos, { index: videos.length, country_code: countryCode, video_id: '' }]);
	};

	const onAddCountry = () => {
		console.log('info', countryInfo);
	};

	const onAddVideo = async () => {
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

		await batch.commit();
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			<div>
				<h2>코드</h2>
				<input id="country_code" value={countryInfo?.country_code} onChange={onChangeInput} />
				<h2>이름</h2>
				<input id="country_name" value={countryInfo?.country_name} onChange={onChangeInput} />
				<h2>설명</h2>
				<input id="description" value={countryInfo?.description} onChange={onChangeInput} />
				<h2>아이콘 주소</h2>
				<input id="icon_url" value={countryInfo?.icon_url} onChange={onChangeInput} />
				<h2>위도</h2>
				<input id="latitude" value={countryInfo?.latitude} onChange={onChangeInput} />
				<h2>경도</h2>
				<input id="longitude" value={countryInfo?.longitude} onChange={onChangeInput} />
				<h2>대륙</h2>
				<input id="region" value={countryInfo?.region} onChange={onChangeInput} />
				<h2>등록</h2>
				<button type="button" onClick={onAddCountry}>
					등록
				</button>
			</div>
			<div>
				<h2>코드</h2>
				<input id="country_code" value={countryCode} onChange={onVideoInput} />
				<h2>영상 아이디</h2>
				<button type="button" onClick={onVideoPush}>
					추가
				</button>
				{videos.map((item) => (
					<input key={item.index} id={item.index?.toString()} value={item.video_id} onChange={onVideoInput} />
				))}
				<button type="button" onClick={onAddVideo}>
					등록
				</button>
			</div>
		</div>
	);
};

export default ManagementPage;
