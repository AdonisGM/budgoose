import RenderCash from "../../../components/renderCash/RenderCash.jsx";
import {useEffect, useState} from "react";
import callApi from "../../../apis/GatewayApi.js";

const TotalCash = (props) => {
    const [data, setData] = useState(undefined)

    useEffect(() => {
        callApi('pkg_dashboard.get_total_balance', {
        }, (data) => {
            setData(data[0])
            console.log(data)
        }, (err) => {
        })
    }, []);

    const classLoan = !data ? 'text-gray-600' : data.C_CASH_LOAN >= 0 ? 'text-green-700' : 'text-red-700';

    return (
        <div>
            <div className={'flex justify-between text-2xl'}>
                <p>Balance</p>
                <p className={'text-green-700'}>
                    {!!data && (
                        <RenderCash
                            cash={data.C_CASH_BALANCE}
                        />
                    )}
                    {!data && '...'}
                </p>
            </div>
            <div className={'flex justify-between text-xs mt-2'}>
                <p>Loan</p>
                <p
                    className={classLoan}
                >
                    {!!data && (
                        <RenderCash
                            cash={Math.abs(data.C_CASH_LOAN)}
                        />
                    )}
                    {!data && '...'}
                </p>
            </div>
            <div className={'flex justify-between text-xs'}>
                <p>Total</p>
                <p className={'text-green-700'}>
                    {!!data && (
                        <RenderCash
                            cash={data.C_TOTAL}
                        />
                    )}
                    {!data && '...'}
                </p>
            </div>
        </div>
    )
}

export default TotalCash;