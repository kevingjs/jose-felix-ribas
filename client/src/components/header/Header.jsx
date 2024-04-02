import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import jfr from '/jfr.png';
import cdce from '/cdce.png';

function Header() {
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

	const pathname = path === "/" ? "home" : path.replace("/", "");

	return (
		<header>
			<div className="logo">
				<img src={cdce} alt="Centro de Desarrollo de la Calidad Educativa Guárico - Logo" onContextMenu={e => e.preventDefault()} draggable={false} />
				<img src={jfr} alt="José Félix Ribas - Logo" onContextMenu={e => e.preventDefault()} draggable={false} />
				<span>José Félix Ribas</span>
			</div>
			<nav>
				{
					pages.map(({ label, path, name }) =>
						<Link
							onClick = {e => {
								if (label === pathname) return e.preventDefault();
							}}
							key = { label }
							className = { `link ${label}${pathname === label ? ' active' : ''}` }
							to = { path }
						>
							<span>{name}</span>
						</Link>
					)
				}
			</nav>
		</header>
	);
};

export default Header;