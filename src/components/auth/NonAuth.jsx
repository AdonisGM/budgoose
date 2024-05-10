import {useLocation, useNavigate} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Cookie from "js-cookie";

const NonAuth = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // check token in cookies
        const info = Cookie.get('access_token', {path: '/', domain: import.meta.env.VITE_DOMAIN_COOKIE});

        if (info !== undefined) {
            navigate('/');
        }

        document.title = 'Budgoose | AdonisGM';
    }, [navigate, location]);

    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default NonAuth