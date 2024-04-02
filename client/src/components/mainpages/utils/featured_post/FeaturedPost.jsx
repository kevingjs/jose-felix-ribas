import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedPost = ({ news, arrow }) => {
	const navigate = useNavigate();
	const featuredPost = news.find(news => news.featured);

	return (
		<>
			{
				featuredPost ?
					<div className='featuredCard'>

						<div className="featuredCard__info">
							<div className="featuredCard__info--title">{featuredPost.title}</div>
							<div className="featuredCard__info--description">{featuredPost.description}</div>
							<div
								className='featuredCard__info--readMore'
								onClick={() => navigate(`/post/${featuredPost._id}`, {
									state: {
										post: featuredPost
									}
								})}
							>
								<span>Leer más</span>
								{arrow}
							</div>
						</div>

						<div className="featuredCard__img">
							<img src={featuredPost.image.url} alt="" onContextMenu={e => e.preventDefault()} draggable={false} />
						</div>

					</div>
				:
					null
			}
		</>
	);
};

export default FeaturedPost;