import {Fragment, useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import {Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import TableLoading from "../../layout/TableLoading.jsx";
import TableEmpty from "../../layout/TableEmpty.jsx";
import {formatDate, formatNumber} from "../../common/common.js";
import {IconEdit, IconTrashX} from "@tabler/icons-react";
import RenderCash from "../../components/renderCash/RenderCash.jsx";
import {confirm} from "../../components/alert/createConfirmation.js";
import toast from "react-hot-toast";

const Transfer = (props) => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllManagement()
    }, [page]);

    const getAllManagement = () => {
        setIsLoading(true)
        callApi('pkg_bud_wallet_trans.get_all', {
            page: page,
            size_page: 10
        }, (data) => {
            setData(data)
            if (data.length > 0) {
                setPages(Math.ceil(data[0].TB_TOTAL_ROW/10))
            }
            setIsLoading(false)
        }, (err) => {
            console.log(err)
            setIsLoading(false)
        })
    }

    const handleOnClick = async (id) => {
        if (await confirm({
            confirmation: 'Are you sure you want to delete this transfer?',
            options: {
                confirm: {
                    text: 'Delete',
                    color: 'danger'
                }
            }
        })) {
            setIsLoading(true)
            callApi('pkg_bud_wallet_trans.delete_item', {
                pk_bud_wallet_trans: id
            }, () => {
                toast.success('Delete successfully.')
                getAllManagement()
            }, (err) => {
                console.log(err)
            })
        }
    }

    return (
        <Fragment>
            <div className={'mt-5'}>
                <Table
                    isStriped={true}
                    bottomContent={
                        pages > 0 ? (
                            <div className="flex w-full justify-end">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                    isDisabled={isLoading}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader>
                        <TableColumn key="TB_ROW_NUM">#</TableColumn>
                        <TableColumn key="C_WALLET_NAME">Wallet name</TableColumn>
                        <TableColumn key="C_CASH_OUT">Cash out</TableColumn>
                        <TableColumn key="C_CASH_IN">Cash in</TableColumn>
                        <TableColumn key="C_WALLET_TARGET_NAME">Wallet target</TableColumn>
                        <TableColumn key="C_DATE">Date</TableColumn>
                        <TableColumn key="C_NOTE">Note</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data ?? []}
                        isLoading={isLoading}
                        loadingContent={<TableLoading/>}
                        emptyContent={<TableEmpty isLoading={isLoading}/>}
                    >
                        {(item) => (
                            <TableRow key={item?.PK_BUD_WALLET_TRANSACTION}>
                                <TableCell>{item?.TB_ROW_NUM}</TableCell>
                                <TableCell>{item?.C_WALLET_NAME}</TableCell>
                                <TableCell><div className={'text-red-600'}><RenderCash cash={item?.C_CASH_OUT}/></div></TableCell>
                                <TableCell><div className={'text-green-600'}><RenderCash cash={item?.C_CASH_IN}/></div></TableCell>
                                <TableCell>{item?.C_WALLET_TARGET_NAME}</TableCell>
                                <TableCell>{formatDate(item?.C_DATE)}</TableCell>
                                <TableCell>{item?.C_NOTE}</TableCell>
                                <TableCell>
                                    {item?.C_IS_LOAN === 0 && (
                                        <div className={'flex items-center gap-1'}>
                                            <IconEdit
                                                className={'text-blue-500 cursor-pointer'}
                                                size={16}
                                                // onClick={() => {handleOpenDetail(item?.PK_BUD_WALLET_TRANSACTION)}}
                                            />
                                            <IconTrashX
                                                className={'text-rose-500 cursor-pointer'}
                                                size={16}
                                                onClick={() => {
                                                    handleOnClick(item?.PK_BUD_WALLET_TRANSACTION)
                                                }}
                                            />
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Fragment>
    )
}

export default Transfer