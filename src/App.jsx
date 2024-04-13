import {motion, useAnimate} from "framer-motion";
import './App.css'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
// import CookieImage from "./assets/cookie-svgrepo-com.svg";
import {Button, Card, Image} from "@nextui-org/react";
import {Fragment, useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Auth from "./components/auth/Auth.jsx";
import Welcome from "./components/welcome/welcome.jsx";
// import Profile from "./components/profile/Profile.jsx";
import Cookies from "js-cookie";
import Transaction from "./components/transaction/Transaction.jsx";
import MainLayout from "./layout/MainLayout.jsx";

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
				element: <Transaction/>,
			},
			{
				path: "/holder",
				element: <p>Holder</p>,
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

		if (Cookies.get('access_token')) {
			try {
				const token = Cookies.get('access_token');
				const base64 = token.split('.')[1];
				const payload = JSON.parse(atob(base64));
				localStorage.setItem('username', payload.data.username);
			} catch (e) {
				Cookies.remove('access_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
				Cookies.remove('refresh_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
				window.location.href = '/';
			}
		}

		if (!Cookies.get('access_token') || !Cookies.get('refresh_token')) {
			localStorage.removeItem('username');
		}
	}, [animate, scope]);

	return (
		<div>
			<RouterProvider router={router}/>
			<Toaster
				toastOptions={{
					className: 'bg-default-900 text-white text-sm',
				}}
				position="top-right"
			/>
			<motion.div
				className={'flex justify-center items-center fixed bottom-0 w-full'}
				initial={{opacity: 0, y: 100, scale: 0}}
				ref={scope}
			>
				<Card
					className={'flex flex-row items-center gap-2 p-2 bg-default-700 text-white w-fit m-2'}
				>
					{/*<Image src={CookieImage} className={'w-6 h-6 min-h-6 min-w-6'}/>*/}
					<Fragment>
						<p className={'text-xs text-center text-default-300 w-full'}>
							We need cookies to run this app. Sorry for the inconvenience!
						</p>
						<Button
							size="sm"
							onPress={() => {
								localStorage.setItem('isAllowCookie', true);
								animate(scope.current, {opacity: 0, y: 100, scale: 0});
							}}
						>
							Accept
						</Button>
					</Fragment>
				</Card>
			</motion.div>
		</div>
	)
}

export default App