import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { countryInfo, countryVideo } from 'store/mapStore';
import { Popup } from 'components';
import { PopupHooks } from 'components/Popup/Popup';
import Carousel from 'components/Carousel/Carousel';

interface CountType {
	viewCount: number;
	likeCount: number;
}

const CountryPopup = ({ popupHooks }: { popupHooks: PopupHooks }) => {
	const info = useRecoilValue(countryInfo);
	const resetInfo = useResetRecoilState(countryInfo);
	const videos = useRecoilValue(countryVideo);
	const resetVideos = useResetRecoilState(countryVideo);
	const [count, setCount] = useState<CountType>();

	useEffect(() => {
		if (popupHooks.isShowing) {
			loadData();
		} else {
			resetInfo();
			resetVideos();
		}
	}, [popupHooks.isShowing]);

	const loadData = async () => {
		const idQueryParams = videos.map((item) => `id=${item}`).join('&');

		const obj = await axios({
			url: `https://www.googleapis.com/youtube/v3/videos?${idQueryParams}`,
			method: 'get',
			params: {
				key: process.env.REACT_APP_GOOGLE_API_KEY,
				part: 'statistics',
			},
		});

		let viewCount = 0;
		let likeCount = 0;

		obj.data.items.forEach((item) => {
			viewCount += Number(item.statistics.viewCount);
			likeCount += Number(item.statistics.likeCount);
		});

		setCount({ viewCount, likeCount });
	};

	return (
		<Popup popupHooks={popupHooks}>
			<div className="popup-content">
				<img src={info.icon_url} alt="국기 아이콘" />
				<div className="country-header">
					<h1>{info.country_name}(Republic of Korea)</h1>
					<span>Asia</span>
					<span>총 조회 수 : {count?.viewCount.toString()} / </span>
					<span>총 좋아요 수 : {count?.likeCount.toString()}</span>
				</div>
				<div className="country-content">
					{/* {videos.length && (
						<Youtube
							className="youtube-video"
							videoId={videos?.[0]}
							opts={{
								width: '100%',
								height: '100%',
								playerVars: {
									autoplay: 0, // 자동재생 O
									rel: 0, // 관련 동영상 표시하지 않음
									modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
								},
							}}
						/>
					)} */}
					<Carousel />
					<button type="button" onClick={() => popupHooks.toggle()}>
						dsadsasa
					</button>
				</div>
			</div>
		</Popup>
	);
};

export default CountryPopup;
