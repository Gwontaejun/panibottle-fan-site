import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Youtube from 'react-youtube';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { countryInfo, countryVideo } from 'store/mapStore';
import { Popup } from 'components';
import { PopupHooks } from 'components/Popup/Popup';
import Carousel from 'components/Carousel/Carousel';
import numeral from 'numeral';

interface CountType {
	viewCount: number;
	likeCount: number;
}

interface CommentType {
	name: string;
	icon: string;
	comment: string;
}

const CountryPopup = ({ popupHooks }: { popupHooks: PopupHooks }) => {
	const info = useRecoilValue(countryInfo);
	const resetInfo = useResetRecoilState(countryInfo);
	const videos = useRecoilValue(countryVideo);
	const resetVideos = useResetRecoilState(countryVideo);
	const [count, setCount] = useState<CountType>();
	const [commentList, setCommentList] = useState<CommentType[]>([]);

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
		let viewCount = 0;
		let likeCount = 0;
		const commentResults: CommentType[] = [];

		try {
			// 영상 정보 (조회수, 좋아요수)
			const videoInfo = await axios({
				url: `https://www.googleapis.com/youtube/v3/videos?${idQueryParams}`,
				method: 'get',
				params: {
					key: process.env.REACT_APP_GOOGLE_API_KEY,
					part: 'statistics',
				},
			});
			videoInfo.data.items.forEach((item) => {
				viewCount += Number(item.statistics.viewCount);
				likeCount += Number(item.statistics.likeCount);
			});

			// 댓글 모음 API 요청
			const commentObj = await axios.all(
				videos.map((item) =>
					axios({
						url: 'https://www.googleapis.com/youtube/v3/commentThreads',
						method: 'get',
						params: {
							key: process.env.REACT_APP_GOOGLE_API_KEY,
							part: 'snippet',
							videoId: item,
							maxResults: 10,
						},
					})
				)
			);

			commentObj.forEach((res) => {
				const comment = res.data.items.map(
					(item): CommentType => ({
						name: item.snippet.topLevelComment.snippet.authorDisplayName,
						icon: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
						comment: item.snippet.topLevelComment.snippet.textDisplay.replaceAll('<br>', '\n'),
					})
				);
				commentResults.push(...comment);
			});

			setCommentList(commentResults);
		} catch (e) {
			console.log('API 요청 에러', e);
		}

		setCount({ viewCount, likeCount });
	};

	return (
		<Popup popupHooks={popupHooks}>
			<div className="popup-container">
				<div className="popup-header">
					<img src={info.icon_url} alt="국기 아이콘" />
					<h1>{info.country_name}(Republic of Korea)</h1>
					<span className="country-region">Asia</span>
					<span className="country-count">
						총합 조회 수 : {numeral(count?.viewCount).format('0,0')} | 좋아요 수 :{' '}
						{numeral(count?.likeCount).format('0,0')}
					</span>
				</div>
				<div className="popup-content">
					<div className="country-content">
						<Carousel>
							{videos.map((item) => (
								<Youtube
									videoId={item}
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
							))}
						</Carousel>
						<div className="country-comments">
							<h3>댓글 모음</h3>
							<hr />
							<ul>
								{commentList.map((item) => (
									<li>
										<img src={item.icon} alt="아이콘" />
										<div>
											<span>{item.name}</span>
											<p>{item.comment}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="popup-bottom">
					<button type="button" onClick={() => popupHooks.toggle()}>
						닫기
					</button>
				</div>
			</div>
		</Popup>
	);
};

export default CountryPopup;
