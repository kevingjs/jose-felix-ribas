import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const ByDate = () => {
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

	const [ mm, dd, yyyy ] = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).split('/');

	const [ dateRange, setDateRange ] = useState({
		since: new Date(new Date(`${yyyy}-${mm}-${dd}T00:00`).getTime() - 31 * 24 * 60 * 60 * 1000).getTime(),
		until: new Date(`${yyyy}-${mm}-${dd}T23:59`).getTime()
	});

	const [ inputValues, setInputValues ] = useState({
		since: new Date(dateRange.since).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/. /g, '-').replace('.', ''),
		until: new Date(dateRange.until).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/. /g, '-').replace('.', '')
	});

	const handleSince = e => {
		const { name, value } = e.target;
		setDateRange({
			...dateRange,
			[name]: new Date(`${value}T00:00`).getTime()
		});
		setInputValues({
			...inputValues,
			[name]: value
		});
	};

	const handleUntil = e => {
		const { name, value } = e.target;
		setDateRange({
			...dateRange,
			[name]: new Date(`${value}T23:59`).getTime()
		});
		setInputValues({
			...inputValues,
			[name]: value
		});
	};
	
	const filterByDate = news.filter(post => {
		const prodDate = new Date(post.createdAt).getTime();
		const { since, until } = dateRange;
		return prodDate >= since && prodDate <= until;
	});

	return (
		<div className='posts__container byDate'>
			
			<div className="posts__container--top">
				<h2 className="page__title">Por fecha</h2>
				<div className="page__tool">

					<div className="top__button__since">
						<span>Desde:</span>
						<input type="date" value={inputValues.since} name="since" onChange={handleSince} />
					</div>

					<div className="top__button__until">
						<span>Hasta:</span>
						<input type="date" value={inputValues.until} name="until" onChange={handleUntil} />
					</div>
				</div>
			</div>

			{
				news.length > 0 ?
					<div className="posts__container--content">
						{
							filterByDate.length > 0 ?
								filterByDate.slice(0, itemLimit).map(post =>
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
								<div className='posts__container--NotFound'>No se han encontrado publicaciones en este rango de fecha</div>
						}
						{
							filterByDate.length > itemLimit ?
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

export default ByDate;