import React from 'react';

const About = () => {
	return (
		<div className='about__container'>

			<div className="about__container--purpose">

				<div className="purpose__info">
					<h2 className="purpose__info--title">Propósito</h2>
					<p className="purpose__info--description">Nuestro propósito en el Grupo Escolar "José Félix Rivas" es ofrecer una educación integral y de calidad, orientada hacia el desarrollo pleno de cada estudiante.</p>
				</div>

				<div className="purpose__img">
					<img src="https://res.cloudinary.com/cdnkeving/image/upload/v1687764055/JFR%20-%20Photos/dakmnft0ofwrjh0wdwh_egajso.jpg" alt="" onContextMenu={e => e.preventDefault()} draggable={false}/>
				</div>

			</div>

			<div className="about__container--principles">

				<h3 className="principles__title">Principios</h3>

				<div className="principles__list">

					<div className='principle__container'>
						<div className="principle__container--number">1</div>
						<span className="principle__container--description">Nos comprometemos a brindar una educación que fomente la libertad de pensamiento y acción.</span>
					</div>

					<div className='principle__container'>
						<div className="principle__container--number">2</div>
						<span className="principle__container--description">Creemos en la igualdad de oportunidades y en el respeto a la diversidad.</span>
					</div>

					<div className='principle__container'>
						<div className="principle__container--number">3</div>
						<span className="principle__container--description">Nuestra misión es formar jóvenes preparados para enfrentar los desafíos del mundo actual.</span>
					</div>

				</div>

			</div>
		</div>
	);
};

export default About;