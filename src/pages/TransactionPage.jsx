import {useEffect} from "react";
import Transaction from "./transactionPage/Transaction.jsx";

const TransactionPage = () => {
	useEffect(() => {
		document.title = "Transaction | AdonisGM";
	}, []);

	return <div className={'container mx-auto'}><Transaction/></div>
}

export default TransactionPage