import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const ImageModal = ({ image, close }) => {
	return (
		<div className='bg-block' onClick={() => close(false)}>
			<div className="image__modal" onClick={e => e.stopPropagation()}>
				<img src={image.url} alt="" draggable={false} onContextMenu={e => e.preventDefault()} />
			</div>
		</div>
	);
};

const Gallery = () => {
	const [ itemLimit, setItemLimit ] = useState(6);
	const [ modal, setModal ] = useState(false);
	const state = useContext(GlobalState);
	const { picsAPI } = state;
	const { pics: picsTools } = picsAPI;
	const [ pics, setPics, getPics ] = picsTools;
	// const [ pics ] = [[]]; // test Loading state

	const showMore = () => setItemLimit(value => value + (value + 6 > pics.length ? pics.length - value : 6));

	useEffect(() => {
		getPics();
	}, []);

	return (
		<>
			{
				modal ?
					<ImageModal image = { modal } close = { setModal } />
				:
					null
			}
			{
				pics.length < 1 ?
					<Loading />
				:
					<div className='gallery__container'>
						{
							pics.slice(0, itemLimit).map(pic =>
								<div key={pic._id} className='pics__card' onClick={() => setModal(pic)}>
									<img src={pic.url} alt="" draggable={false} onContextMenu={e => e.preventDefault()} loading='lazy' />
								</div>
							)
						}
						{
							pics.length > itemLimit ?
								<div className="overlay__fade">
									<div className='showMore' onClick={showMore}>
										<FontAwesomeIcon icon={icon({ name: 'chevron-down', style: 'solid' })} />
									</div>
								</div>
							:
								null
						}
					</div>
			}
		</>
	);
};

export default Gallery;