import {useEffect} from "react";
import Transfer from "./transferPage/Transfer.jsx";

const TransferPage = () => {
    useEffect(() => {
        document.title = "Transfer | AdonisGM";
    }, []);

    return <div className={'container mx-auto'}>
        <Transfer/>
    </div>
}

export default TransferPage