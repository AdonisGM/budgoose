import {Button, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {IconArrowBigRightFilled} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

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

const Welcome = () => {
    const [quote, setQuote] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setIsLogin(Cookies.get('access_token') !== undefined && Cookies.get('refresh_token') !== undefined);
    }, []);

    const handleLogin = () => {
        if (isLogin) {
            const username = localStorage.getItem('username')
            navigate(`/profile/${username}`);
            return;
        }

        const redirect_uri = encodeURIComponent(window.location.origin);

        // window.location.href = `https://account.nmtung.dev/login?redirect_uri=${redirect_uri}`;
        window.location.href = `${import.meta.env.VITE_SSO_URL}/login?redirect_uri=${redirect_uri}`;
    }

    useEffect(() => {

    }, []);

    return (
        <div className={'flex flex-col items-center justify-center h-screen bg-amber-50'}>
            <h1 className={'text-default-500 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'}>Diary</h1>
            <Spacer y={10}/>
            <p className={'text-default-500 text-sm'}>
                Oh, Bạn đó à! Có chuyện gì khó nói không? Viết ra đi, viết ra đi. Viết ra cho mình nghe, mình sẽ giữ bí mật và luôn ở đây với bạn khi bạn cần.
            </p>
            <p className={'text-default-500 text-sm'}>
                Bạn có thể viết nhật ký của mình ở chế độ riêng tư hoặc công khai.
            </p>
            <Spacer y={16}/>
            <Button
                size="md"
                className={'bg-default-900 text-white'}
                endContent={isLogin ? <IconArrowBigRightFilled size={20} stroke={2.5} color={'#fff'}/> : undefined}
                onPress={handleLogin}
            >
                {isLogin ? 'Bắt đầu viết ' : 'Đăng nhập '}
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
        </div>
    )
}

export default Welcome