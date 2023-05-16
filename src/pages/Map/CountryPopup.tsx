import React, { useRef, useState, useEffect } from 'react';

// state, service
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { countryInfo, countryVideo } from 'store/mapStore';
import { getCommentList, getVideoInfo } from 'service';

// component or style
import { Popup } from 'components';
import { PopupHooks } from 'components/Popup/Popup';
import Carousel from 'components/Carousel/Carousel';
import Button from 'components/Button/Button';
import styled from 'styled-components';

// other library (util or component)
import Youtube from 'react-youtube';
import numeral from 'numeral';

const CommentIcon = styled.img`
	width: 4rem;
	height: 4rem;
	border: none;
	border-radius: 50%;
	&.skeleton {
		background-color: ${(props) => props.theme.skeletonColor};
	}
`;

const CommentSkeleton = styled.div`
	background-image: linear-gradient(${(props) => props.theme.skeletonColor} 15px, transparent 0),
		linear-gradient(${(props) => props.theme.skeletonColor} 15px, transparent 0),
		linear-gradient(${(props) => props.theme.skeletonColor} 15px, transparent 0);

	background-repeat: repeat-y;

	background-position: 5px 0px, 5px 30px, 5px 50px;

	background-size: 100px 100px, 300px 100px, 300px 100px;
`;

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
	const readyLength = useRef<number>(0);
	const info = useRecoilValue(countryInfo);
	const videos = useRecoilValue(countryVideo);
	const resetInfo = useResetRecoilState(countryInfo);
	const resetVideos = useResetRecoilState(countryVideo);
	const [count, setCount] = useState<CountType>();
	const [commentList, setCommentList] = useState<CommentType[]>([]);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (popupHooks.isShowing) {
			loadData();
		} else {
			readyLength.current = 0;
			setIsReady(false);
			resetInfo();
			resetVideos();
		}
	}, [popupHooks.isShowing]);

	const onVideoReady = () => {
		readyLength.current += 1;
		if (readyLength.current === videos.length) {
			setIsReady(true);
		}
	};

	const loadData = async () => {
		// 영상 정보 (조회수, 좋아요수)
		getVideoInfo(videos).then((r) => {
			let viewCount = 0;
			let likeCount = 0;

			r.data.items.forEach((item) => {
				viewCount += Number(item.statistics.viewCount);
				likeCount += Number(item.statistics.likeCount);
			});

			setCount({ viewCount, likeCount });
		});

		// 댓글 모음 API 요청
		getCommentList(videos).then((r) => {
			const commentResults: CommentType[] = [];
			r.forEach((res) => {
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
		});
	};

	const renderComment = () =>
		isReady ? (
			commentList.map((item) => (
				<li>
					<CommentIcon src={item.icon} alt="아이콘" />
					<div>
						<span>{item.name}</span>
						<p>{item.comment}</p>
					</div>
				</li>
			))
		) : (
			<li>
				<CommentIcon src={undefined} className="skeleton" />
				<CommentSkeleton />
			</li>
		);

	return (
		<Popup popupHooks={popupHooks} className="country-popup">
			<div className="popup-header">
				<img src={info.icon_url} alt="국기 아이콘" />
				<h1>{info.country_name}</h1>
				<span className="country-region">{info.region}</span>
				<span className="country-count">
					총합 조회 수 : {numeral(count?.viewCount).format('0,0')} | 좋아요 수 :{' '}
					{numeral(count?.likeCount).format('0,0')}
				</span>
			</div>
			<div className="popup-content">
				<div className="country-content">
					{videos.length && (
						<Carousel isReady={isReady}>
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
									onReady={onVideoReady}
								/>
							))}
						</Carousel>
					)}
					<div className="country-comments">
						<h3>댓글 모음</h3>
						<hr />
						<ul>{popupHooks.isShowing && renderComment()}</ul>
					</div>
				</div>
			</div>
			<div className="popup-bottom">
				<Button type="button" onClick={() => popupHooks.toggle()}>
					닫기
				</Button>
			</div>
		</Popup>
	);
};

export default CountryPopup;
