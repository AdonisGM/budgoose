import {useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import {Button, Card, CardBody, Pagination, Table, User} from "@nextui-org/react";
import {formatNumber} from "../../common.js";
import TableTransaction from "./TableTransaction.jsx";

const Transaction = (props) => {
    const [holders, setHolders] = useState([])

    useEffect(() => {
        callApi('pkg_bud_holder.get_all', {
            page: 1,
            size_page: 100
        }, (data) => {
            setHolders(data)
        }, (err) => {
            console.log(err)
        })
    }, []);

    return (
        <div className={'flex flex-col items-center'}>
            <div className={'w-[1100px] flex flex-row gap-5'}>
                <div className={'w-1/4 sticky top-0 self-start'}>
                    <Card
                        className={'mt-5'}
                    >
                        <CardBody className={'py-3 flex flex-col items-center justify-center'}>
                            <h1 className={'text-default-500 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400'}>Budgoose</h1>
                        </CardBody>
                    </Card>
                    <Card
                        className={'mt-5'}
                    >
                        <CardBody>
                            <div className={'grid grid-cols-1 gap-2'}>
                                {holders.map((holder, index) => (
                                    <Card key={index} className={'cursor-pointer'}>
                                        <CardBody
                                        >
                                            <p className={'text-sm'}>{holder.C_HOLDER_NAME}</p>
                                            <p className={'text-sm text-right mt-2 text-green-600 font-bold'}>{formatNumber(holder.C_CASH_BALANCE)} đ</p>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                    <div className="mt-5 grid grid-cols-5 gap-1">

                    </div>
                </div>
                <div className={'w-3/4 mt-5'}>
                    <TableTransaction/>
                </div>
            </div>
        </div>
    )
}

export default Transaction