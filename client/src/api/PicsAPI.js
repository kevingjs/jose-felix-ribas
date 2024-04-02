import { useState, useEffect } from 'react';
import axios from 'axios';

function PicsAPI() {
	const [ pics, setPics ] = useState([]);

	const getPics = async () => {
		try {
			const { data: { status, success, content } } = await axios.get('/api/pics');
			setPics(pics => [...(success ? content : [])]);
		} catch (err) {
			console.log(err.response.data.content);
		};
	};

	useEffect(() => {
		getPics();
	}, []);

	return {
		pics: [ pics, setPics, getPics ]
	};
};

export default PicsAPI;