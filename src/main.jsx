import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";

const userLocale = navigator.language;

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider locale={userLocale}>
        <App />
    </NextUIProvider>
)