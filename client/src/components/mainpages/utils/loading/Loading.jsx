import React from 'react';

function Loading() {
	return (
		<div className="loader">
			<svg className="loader__circle" viewBox="25 25 50 50">
				<circle className="loader__circle--path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
			</svg>
		</div>
	);
};

export default Loading;