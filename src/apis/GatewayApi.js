import Cookies from "js-cookie";
import toast from "react-hot-toast";

let isRefreshingToken = false;
let arrPendingRequest = [];

let ENDPOINT = import.meta.env.VITE_API_URL;
let DOMAIN_COOKIE = import.meta.env.VITE_DOMAIN_COOKIE;
let URL_GATEWAY = `${ENDPOINT}/gateway`;
let URL_REFRESH_TOKEN = `${ENDPOINT}/account/refresh-token`;

const callApi = (cmd, data, onSuccess, onError) => {
    const optionFetch = createOptionFetch({cmd: cmd, data: data});
    fetch(URL_GATEWAY, optionFetch)
        .then((res) => {
            if (res.status === 401) {
                if (isRefreshingToken) {
                    arrPendingRequest.push({
                        cmd: cmd,
                        data: data,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                } else {
                    isRefreshingToken = true;
                    callRefreshToken(() => {
                        callApi(cmd, data, onSuccess, onError);
                    });
                }
            } else if (res.status === 500) {
                toast.error('Lỗi gì đó rồi 😭');
            } else if (res.status === 499) {
                return Promise.reject(undefined);
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (data.error_message) {
                toast.error(data.error_message);
                if (typeof onError === 'function') {
                    onError();
                }
            }

            onSuccess(data.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

const callRefreshToken = (onSuccess) => {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) {
        removeToken();
    }

    const optionFetch = createOptionFetch({refresh_token: refreshToken})
    fetch(URL_REFRESH_TOKEN, optionFetch)
        .then((res) => {
            if (res.ok) {
                isRefreshingToken = false;
                recallApi();
                onSuccess();
            } else {
                removeToken();
            }
        })
        .catch(() => {
            removeToken();
        })
}

const recallApi = () => {
    const cloneArrPendingRequest = [...arrPendingRequest];
    arrPendingRequest = [];

    cloneArrPendingRequest.forEach((apiInfomation) => {
        callApi(apiInfomation.cmd, apiInfomation.data, apiInfomation.onSuccess, apiInfomation.onError);
    })
}

const removeToken = () => {
    Cookies.remove('access_token', {path: '/', domain: DOMAIN_COOKIE});
    Cookies.remove('refresh_token', {path: '/', domain: DOMAIN_COOKIE});
    window.location.href = '/';
}

const createOptionFetch = (body) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    };
}

export default callApi