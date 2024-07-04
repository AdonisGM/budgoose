import {useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import InputAutocomplete from "./core/InputAutocomplete.jsx";

const InputSelectWallet = (props) => {
	const [holders, setHolders] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getWallets()
	}, []);

	const getWallets = () => {
		setHolders([])

		callApi('pkg_bud_wallet.get_all', {}, (data) => {
			setHolders(data.map((e) => {
				return {
					value: e.PK_BUD_WALLET,
					label: e.C_NAME
				}
			}))

			setIsLoading(false)
		})
	}

	return <InputAutocomplete
		data={holders}
		isLoading={isLoading}
		{...props}
	/>
}

export default InputSelectWallet;