import { useState, useEffect } from 'react';
import axios from 'axios';

function NewsAPI() {
	const [ news, setNews ] = useState([]);

	const getNews = async () => {
		try {
			const { data: { status, success, content } } = await axios.get('/api/news');
			setNews(news => [...(success ? content : [])]);
		} catch (err) {
			console.log(err.response.data.content);
		};
	};

	useEffect(() => {
		getNews();
	}, []);

	return {
		news: [ news, setNews, getNews ]
	};
};

export default NewsAPI;