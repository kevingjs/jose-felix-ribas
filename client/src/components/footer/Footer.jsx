import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Footer = () => {
	const location = useLocation();
	const { pathname: path } = location;

	const pages = [
		{
			label: "home",
			path: "/",
			name: "Inicio"
		},
		{
			label: "gallery",
			path: "/gallery",
			name: "Galería"
		},
		{
			label: "about",
			path: "/about",
			name: "Acerca de"
		},
		{
			label: "contact",
			path: "/contact",
			name: "Contáctanos"
		}
	];

	const socials = [
		{
			label: "Facebook",
			url: 'https://www.facebook.com/profile.php?id=100063777708388',
			icon: <FontAwesomeIcon icon = { icon({ name: 'facebook', style: 'brands' }) } />
		},
		{
			label: "Instagram",
			url: 'https://www.instagram.com/gejosefelix/',
			icon: <FontAwesomeIcon icon = { icon({ name: 'instagram', style: 'brands' }) } />
		},
		{
			label: "Twitter",
			url: 'https://twitter.com/ebjosefribas',
			icon: <FontAwesomeIcon icon = { icon({ name: 'twitter', style: 'brands' }) } />
		}
	];

	const pathname = path === "/" ? "home" : path.replace("/", "");

	return (
		<footer>
			
			<div className="separator"></div>

			<div className='footer__container'>

				<div className="footer__container--columns left">
					<h4 className='left__title'>José Félix Ribas</h4>
					<div className="left__nav">
						{
							pages.map(({ label, path, name }) =>
								<Link
									onClick={e => {
										if (label === pathname) return e.preventDefault();
									}}
									key = { label }
									className = 'link'
									to = { path }
								>
									{ name }
								</Link>
							)
						}
					</div>
				</div>
	
				<div className="footer__container--columns center">
					<h4 className="center__title">Dirección</h4>
					<div className="center__address">
						<span>Av. Miranda 80</span>
						<span>San Juan de los Morros 2301</span>
						<span>Guárico</span>
					</div>
				</div>
	
				<div className="footer__container--columns right">
					<h4 className="right__title">Síguenos</h4>
					<div className="right__socials">
						{
							socials.map(({ label, url, icon }) => 
								<Link 
									key={label}
									to={url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{ icon }
								</Link>
							)
						}
					</div>
				</div>
				
			</div>

			<div className='credits'>

				<FontAwesomeIcon icon = { icon({ name: 'code', style: 'solid' }) } />

				<span>por</span>

				<Link
					to = 'https://github.com/kevingjs'
					target = "_blank"
					rel = "noopener noreferrer"
				>
					Keving Andrades
				</Link>
				
				<span>{new Date().getFullYear()}</span>

			</div>

		</footer>
	);
};

export default Footer;