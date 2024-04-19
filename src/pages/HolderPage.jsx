import {useEffect} from "react";
import Holder from "./holderPage/Holder.jsx";

const TransactionPage = () => {
	useEffect(() => {
		document.title = "Holder | AdonisGM";
	}, []);

	return <Holder/>
}

export default TransactionPage