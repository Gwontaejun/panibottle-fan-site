import axios from 'axios';

const getVideoInfo = (videos: string[]) => {
	const idQueryParams = videos.map((item) => `id=${item}`).join('&');

	return axios
		.get(`https://www.googleapis.com/youtube/v3/videos?${idQueryParams}`, {
			params: {
				key: process.env.REACT_APP_GOOGLE_API_KEY,
				part: 'statistics',
			},
		})
		.then((r) => r);
};

const getCommentList = (videos: string[]) =>
	axios
		.all(
			videos.map((videoId) =>
				axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
					params: {
						key: process.env.REACT_APP_GOOGLE_API_KEY,
						part: 'snippet',
						maxResults: 20,
						videoId,
					},
				})
			)
		)
		.then((r) => r);

export { getVideoInfo, getCommentList };
