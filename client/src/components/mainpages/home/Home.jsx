import React, { useContext, useEffect, useState } from 'react';
import FeaturedPost from '../utils/featured_post/FeaturedPost';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, useNavigate } from 'react-router-dom';

const Latest = ({ news, arrow }) => {
	const navigate = useNavigate();

	return (
		<div className='postModules__container latest'>

			<div className="postModules__container--top">

				<h3 className="top__title">Más recientes</h3>

			</div>

			<div className="postModules__container--center">
				{
					news.slice(0, 3).map(post =>
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
								<img src={post.image.url} alt="" onContextMenu={e => e.preventDefault()} draggable={false} />
							</div>
							<div className="post__card--info">
								<h5 className='info__title'>{post.title}</h5>
								<p className="info__description">{post.description}</p>
							</div>
						</div>
					)
				}
			</div>

			{
				news.length > 3 ?
					<div className='postModules__container--bottom'>
						<Link to='/latest'>
							<span>Ver más</span>
							{arrow}
						</Link>
					</div>
				:
					null
			}
		</div>
	);
};

const ByCategory = ({ news, arrow, sortDown }) => {
	const navigate = useNavigate();
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

	return (
		<div className='postModules__container category'>
			<div className="postModules__container--top">
				<h3 className="top__title">Por categoría</h3>
				<div className={`top__button${openCategory ? ' expanded' : ''}`}>
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
				filterByCategory.length > 0 ?
					<>
						<div className="postModules__container--center">
							{
								filterByCategory.slice(0, 3).map(post =>
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
											<img src={post.image.url} alt="" onContextMenu={e => e.preventDefault()} draggable={false} />
										</div>
										<div className="post__card--info">
											<h5 className='info__title'>{post.title}</h5>
											<p className="info__description">{post.description}</p>
										</div>
									</div>
								)
							}
						</div>

						{
							filterByCategory.length > 3 ?
								<div className='postModules__container--bottom'>
									<Link to='/bycategory'>
										<span>Ver más</span>
										{arrow}
									</Link>
								</div>
							:
								null
						}
					</>
					:
					<div className='postModules__container--NotFound'>No se han encontrado publicaciones con esta categoría</div>
			}

		</div>
	);
};

const ByDate = ({ news, arrow }) => {
	const navigate = useNavigate();

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
		<div className='postModules__container date'>
			<div className="postModules__container--top">
				<h3 className="top__title">Por fecha</h3>
				<div className="top__button">

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
				filterByDate.length > 0 ?
					<>
						<div className="postModules__container--center">
							{
								filterByDate.slice(0, 3).map(post =>
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
											<img src={post.image.url} alt="" onContextMenu={e => e.preventDefault()} draggable={false} />
										</div>
										<div className="post__card--info">
											<h5 className='info__title'>{post.title}</h5>
											<p className="info__description">{post.description}</p>
										</div>
									</div>
								)
							}
						</div>

						{
							filterByDate.length > 3 ?
								<div className='postModules__container--bottom'>
									<Link to='/bydate'>
										<span>Ver más</span>
										{arrow}
									</Link>
								</div>
							:
								null
						}
					</>
					:
					<div className="postModules__container--NotFound">No se han encontrado publicaciones en este rango de fecha</div>
			}

		</div>
	);
};

const Home = () => {
	const state = useContext(GlobalState);
	const { newsAPI } = state;
	const { news: newsTools } = newsAPI;
	const [ news, setNews, getNews ] = newsTools;

	useEffect(() => {
		getNews();
	}, []);

	const arrowRightLong = <FontAwesomeIcon icon = { icon({ name: 'arrow-right-long', style: 'solid' }) } />;
	const sortDown = <FontAwesomeIcon icon = { icon({ name: 'sort-down', style: 'solid' }) } viewBox="0 280 320 205"/>;

	return (
		<>
			{
				news.length < 1 ?
					<Loading />
				:
					<div className='home__container'>

						<FeaturedPost news = { news } arrow = { arrowRightLong } />

						<div className="home__container--posts">

							<Latest news = { news } arrow = { arrowRightLong } />

							<ByCategory news = { news } arrow = { arrowRightLong } sortDown = { sortDown } />

							<ByDate news = { news } arrow = { arrowRightLong } />

						</div>
						
					</div>
			}
		</>
	);
};

export default Home;