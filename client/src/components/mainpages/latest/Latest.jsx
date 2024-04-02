import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Latest = () => {
	const navigate = useNavigate();
	const state = useContext(GlobalState);
	const { newsAPI } = state;
	const { news: newsTools } = newsAPI;
	const [ news, setNews, getNews ] = newsTools;
	const [ itemLimit, setItemLimit ] = useState(8);

	const showMore = () => setItemLimit(value => value + (value + 8 > news.length ? news.length - value : 8));

	useEffect(() => {
		getNews();
	}, []);

	return (
		<div className='posts__container latest'>
			
			<div className="posts__container--top">
				<h2 className="page__title">Más recientes</h2>
			</div>

			{
				news.length > 0 ?
					<div className="posts__container--content">
						{
							news.slice(0, itemLimit).map(post =>
								<div
									key={post._id}
									className='post__card'
									onClick={() => navigate(`/post/${post._id}`, {
										state: {
											post
										}
									})}
								>
									<div className="post__card--img">
										<img src={post.image.url} alt="" onContextMenu={e => e.preventDefault()} draggable={false} loading='lazy' />
									</div>

									<div className="post__card--info">
										<div className="info__title">{post.title}</div>
										<div className="info__description">{post.description}</div>
									</div>
								</div>
							)
						}
						{
							news.length > itemLimit ?
								<div className='showMore__container'>
									<div className='showMore' onClick={showMore}>
										<FontAwesomeIcon icon={icon({ name: 'chevron-down', style: 'solid' })} />
									</div>
								</div>
							:
								null
						}
					</div>
				:
					<Loading />
			}
		</div>
	);
};

export default Latest;