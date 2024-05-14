import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react"
import store from './redux/store'
import {Provider} from 'react-redux'

const userLocale = navigator.language;

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<NextUIProvider locale={userLocale}>
			<App/>
		</NextUIProvider>
	</Provider>
)