import React, { createContext, useState } from 'react';
import NewsAPI from './api/NewsAPI';
import PicsAPI from './api/PicsAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [ loading, setLoading ] = useState(true);

	const state = {
		picsAPI: PicsAPI(),
		newsAPI: NewsAPI(),
		loading: [ loading, setLoading ]
	};

	return (
		<GlobalState.Provider value={state}>
			{ children }
		</GlobalState.Provider>
	);
};