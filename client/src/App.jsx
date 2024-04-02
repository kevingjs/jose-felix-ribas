import React, { useEffect } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/header/Header';
import Home from './components/mainpages/home/Home';
import PostDetails from './components/mainpages/postDetails/PostDetails';
import Gallery from './components/mainpages/gallery/Gallery';
import About from './components/mainpages/about/About';
import Contact from './components/mainpages/contact/Contact';
import NotFound from './components/mainpages/utils/not_found/NotFound';
import Footer from './components/footer/Footer';
import Latest from './components/mainpages/latest/Latest';
import ByDate from './components/mainpages/by_date/ByDate';
import ByCategory from './components/mainpages/byCategory/ByCategory';

const ScrollToTop = ({ children }) => {
	const location = useLocation();
	
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [ location ]);

	return <>
		{ children }
	</>;
};

const AppLayout = () => {
	const location = useLocation();
	const { pathname } = location;

	let page = pathname === "/" ? "home" : pathname.replace("/", "");

	if (page.includes("post/")) page = "postDetails";

	return (
		<DataProvider>
			<ScrollToTop>
				<Header />
				<main className={page}>
					<Outlet key={pathname} />
				</main>
				<Footer />
			</ScrollToTop>
		</DataProvider>
	);
};

const router = createBrowserRouter([
	{
		element: (<AppLayout />),
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/post/:id',
				element: <PostDetails />
			},
			{
				path: '/gallery',
				element: <Gallery />
			},
			{
				path: '/about',
				element: <About />
			},
			{
				path: '/contact',
				element: <Contact />
			},
			{
				path: '/latest',
				element: <Latest />
			},
			{
				path: '/bydate',
				element: <ByDate />
			},
			{
				path: '/bycategory',
				element: <ByCategory />
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
};

export default App;