import {motion, useAnimate} from "framer-motion";
import './App.css'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import {Button, Card} from "@nextui-org/react";
import {Fragment, useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Welcome from "./components/welcome/welcome.jsx";
import Cookies from "js-cookie";
import MainLayout from "./layout/MainLayout.jsx";
import TransactionPage from "./pages/TransactionPage.jsx";
import HolderPage from "./pages/HolderPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Welcome/>,
	},
	{
		path: "/",
		element: <MainLayout/>,
		children: [
			{
				path: "/transaction",
				element: <TransactionPage/>,
			},
			{
				path: "/holder",
				element: <HolderPage/>,
			},
		]
	},
	{
		path: "*",
		element: <p>404</p>,
	}
]);

function App() {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (!localStorage.getItem('isAllowCookie')) {
			animate(scope.current, {opacity: 1, y: 0, scale: 1});
		}

		if (Cookies.get('info')) {
			try {
				const info = JSON.parse(decodeURIComponent(Cookies.get('info')));
				localStorage.setItem('username', info);
			} catch (e) {
				Cookies.remove('info', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
				window.location.href = '/';
			}
		}

		if (!Cookies.get('info')) {
			localStorage.removeItem('username');
		}
	}, [animate, scope]);

	return (
		<div>
			<RouterProvider router={router}/>
		</div>
	)
}

export default App
