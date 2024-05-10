import {useNavigate,useLocation} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Cookie from "js-cookie";

const Auth = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // check token in cookies
        const info = Cookie.get('info', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});

        if (info === undefined) {
            Cookie.remove('info', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});
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