import {useEffect} from "react";
import Holder from "./holderPage/Holder.jsx";

const TransactionPage = () => {
	useEffect(() => {
		document.title = "Holder | AdonisGM";
	}, []);

	return <div className={'container mx-auto'}><Holder/></div>
}

export default TransactionPage