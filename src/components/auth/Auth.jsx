import {useNavigate,useLocation} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Cookie from "js-cookie";

const Auth = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // check token in cookies
        const token = Cookie.get('access_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
        const refreshToken = Cookie.get('refresh_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});

        if (token === undefined || refreshToken === undefined) {
            Cookie.remove('access_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
            Cookie.remove('refresh_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
            navigate('/login');
        }

        document.title = 'Budgoose | AdonisGM';
    }, [navigate, location]);

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Auth