import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Contact = () => {

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

	return (
		<div className='contact__container'>

			<div className="contact__container--info">

				<div className="info__socials">
					{
						socials.map(({ label, url, icon }) =>
							<Link
								key={label}
								to={url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{icon}
							</Link>
						)
					}
				</div>

				<address className="info__address">ebjosefribas@gmail.com</address>

				<span className="info__dir">80 Av. Miranda, San Juan de los Morros 2301, Guárico</span>

			</div>

			<div className="contact__container--map">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.5841720049915!2d-67.36494903050023!3d9.90589092049871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2aa9f6c506e8e7%3A0xb6a58a98f95736c4!2sEB.%20Jos%C3%A9%20F%C3%A9lix%20Ribas!5e0!3m2!1ses-419!2sve!4v1687768798163!5m2!1ses-419!2sve"
					style={{ border: 0 }}
					allowFullScreen=""
					loading="eager"
					referrerPolicy="no-referrer-when-downgrade"
				>
				</iframe>
			</div>

		</div>
	);
};

export default Contact;