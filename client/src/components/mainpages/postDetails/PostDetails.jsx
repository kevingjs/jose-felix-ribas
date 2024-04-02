import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

const PostDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const [ localState, setLocalState ] = useState(location.state || {});
	const { post } = localState;
	const state = useContext(GlobalState);
	const { newsAPI } = state;
	const { news: newsTools } = newsAPI;
	const [ news, setNews, getNews ] = newsTools;

	useEffect(() => {
		getNews();
	}, []);

	useEffect(() => {
		if (news.length && !Object.keys(localState).length && params) {
			const postFound = news.find(news => news._id === params.id);
			if (postFound) return setLocalState({...localState, post: postFound});
			return navigate('/');
		};
	}, [ params.id, news ]);

	if (!Object.keys(localState).length) return <Loading />;

	const { _id: id, title, body, category, image, by, createdAt } = post;

	const day = new Date(createdAt).toLocaleString('es-VE', { day: '2-digit' });
	const month = new Date(createdAt).toLocaleString('es-VE', { month: 'long' });
	const year = new Date(createdAt).toLocaleString('es-VE', { year: 'numeric' });
	const mm = `${month[0].toUpperCase()}${month.slice(1)}`;
	const newDate = `${day} de ${mm} de ${year}`;
	const time =  new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
	.replace("p. m.", "PM")
	.replace("a. m.", "AM");

	return (
		<div className='postDetails__container'>
			
			<div className="postDetails__info">
				<div className="postDetails__info--category">{category}</div>
				<div className="postDetails__info--title">{title}</div>
				<div className="postDetails__info--date">
					<FontAwesomeIcon icon = { icon({ name: 'newspaper', style: 'solid' }) } />
					<span className='date'>{newDate} - {time}</span>
				</div>
			</div>

			<div className="postDetails__image">
				<img src={image.url} alt="" draggable={false} onContextMenu={e => e.preventDefault()} />
			</div>

			<div className="postDetails__content">

				<div className="ql-editor">
					<div className="body__content" dangerouslySetInnerHTML={{ __html: body }}></div>
				</div>

			</div>

		</div>
	);
};

export default PostDetails;