import {useEffect} from "react";
import Transaction from "./transactionPage/Transaction.jsx";

const TransactionPage = () => {
	useEffect(() => {
		document.title = "Transaction | AdonisGM";
	}, []);

	return <Transaction/>
}

export default TransactionPage