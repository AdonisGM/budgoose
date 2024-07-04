import {Button, Card, CardBody, CircularProgress, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {IconArrowBigRightFilled, IconBrandGithubFilled} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import callApi from "../../apis/GatewayApi.js";

const quotes = [
	{
		quote: 'Write what disturbs you, what you fear, what you have not been willing to speak about. Be willing to be split open.',
		author: 'Natalie Goldberg'
	},
	{
		quote: 'The first draft is just you telling yourself the story.',
		author: 'Terry Pratchett'
	},
	{
		quote: 'You can always edit a bad page. You can’t edit a blank page.',
		author: 'Jodi Picoult'
	},
	{
		quote: 'Start writing, no matter what. The water does not flow until the faucet is turned on.',
		author: 'Louis L’Amour'
	}
]

const buttonContent = {
	login: 'Login with SSO',
	register: 'Register service',
}

const Welcome = () => {
	const [quote, setQuote] = useState({});
	const [stateButton, setStateButton] = useState(undefined)
	const [isChecking, setIsChecking] = useState(true)
	const navigate = useNavigate();

	useEffect(() => {
		setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

		// check register if login
		if (Cookies.get('info') === undefined) {
			setStateButton('login')
			setIsChecking(false)
			return
		}

		// check register service
		callApi('pkg_user.check_register_service', {
			service: 'budgoose',
		}, (data) => {
			if (data[0].STATUS !== 1) {
				setStateButton('register')
				setIsChecking(false)
				return
			}

			navigate(`/dashboard`);
		}, () => {

		});
	}, []);

	const handleLogin = () => {
		const redirect_uri = encodeURIComponent(window.location.origin);
		window.location.href = `${import.meta.env.VITE_SSO_URL}/login?redirect_uri=${redirect_uri}`;
	}

	const handleRegisterService = () => {
		setIsChecking(true)

		callApi('pkg_user.register_service', {
			service: 'budgoose',
		}, () => {
			navigate(`/dashboard`);
		});
	}

	const handleClickButton = () => {
		switch (stateButton) {
			case 'login':
				handleLogin()
				break;
			case 'register':
				handleRegisterService();
				break;
		}
	}

	return (
		<div className={'flex flex-col items-center justify-center h-screen bg-green-50 gap-3'}>
			<Card className={'w-1/2'}>
				<CardBody className={'flex flex-col items-center justify-center py-10'}>
					<div className={'flex flex-col items-center justify-center '}>
						<h1
							className={'text-default-500 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400 leading-normal'}>Budgoose</h1>
					</div>

					<Spacer y={10}/>
					<p className={'text-default-500 text-sm'}>
						Manage your debt effectively with our user-friendly online tools designed to help you achieve financial
						freedom.
					</p>
					<Spacer y={16}/>
					<Button
						size="md"
						className={'bg-default-900 text-white w-[160px]'}
						onClick={handleClickButton}
						isLoading={isChecking}
					>
						{!isChecking && buttonContent[stateButton]}
					</Button>
					<Spacer y={14}/>
					<div className={'flex flex-col items-center justify-center'}>
						<Spacer y={2}/>
						<p className={'text-default-400 text-sm italic'}>
							{quote.quote}
						</p>
						<Spacer y={1}/>
						<p className={'text-default-400 text-sm italic'}>
							- {quote.author}
						</p>
					</div>
				</CardBody>
			</Card>
			<div className={'flex justify-center items-center overflow-hidden'}>
				<p className={'text-xs text-gray-400'}>©{new Date(Date.now()).getFullYear()} Adonis Willer | All Rights
					Reserved | admin@nmtung.dev</p>
			</div>
		</div>
	)
}

export default Welcome
