import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

const ByCategory = () => {
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

	const [ openCategory, setOpenCategory ] = useState(false);
	const [ selected, setSelected ] = useState('Educativo');

	const categoryList = [
		"Evento",
		"Informativo",
		"Educativo",
		"Publicitario",
		"Concientización",
		"Entretenimiento"
	];

	const categoryHandler = e => {
		const category = e.currentTarget.innerText;
		setOpenCategory(!openCategory);
		setSelected(category);
	};

	const filterByCategory = news.filter(post => post.category === selected);

	const sortDown = <FontAwesomeIcon icon = { icon({ name: 'sort-down', style: 'solid' }) } viewBox="0 280 320 205"/>;

	return (
		<div className='posts__container byCategory'>
			
			<div className="posts__container--top">
				<h2 className="page__title">Por categoría</h2>
				<div className={`page__tool${openCategory ? ' expanded' : ''}`}>

					<div className='selected' title='Elije una categoría' onClick={() => setOpenCategory(!openCategory)}>
						<span>{selected}</span>
						{sortDown}
					</div>
					
					<div className="list">
						{
							categoryList.map(category => <span key={category} onClick={categoryHandler}>{category}</span>)
						}
					</div>

				</div>
			</div>

			{
				news.length > 0 ?
					<div className="posts__container--content">
						{
							filterByCategory.length > 0 ?
								filterByCategory.slice(0, itemLimit).map(post =>
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
							:
								<div className="posts__container--NotFound">No se han encontrado publicaciones con esta categoría</div>
						}
						{
							filterByCategory.length > itemLimit ?
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

export default ByCategory;