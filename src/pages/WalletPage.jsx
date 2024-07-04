import {useEffect} from "react";
import Wallet from "./walletPage/Wallet.jsx";

const WalletPage = () => {
    useEffect(() => {
        document.title = "Wallet | AdonisGM";
    }, []);

    return <div className={'container mx-auto'}><Wallet/></div>
}

export default WalletPage