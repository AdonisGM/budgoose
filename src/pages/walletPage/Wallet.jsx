import {Fragment, useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import UpdateTransaction from "../transactionPage/UpdateTransaction.jsx";
import CalculateInvoice from "../transactionPage/CalculateInvoice.jsx";
import {
    Button,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from "@nextui-org/react";
import TableLoading from "../../layout/TableLoading.jsx";
import TableEmpty from "../../layout/TableEmpty.jsx";
import {IconArrowBigUpFilled, IconEdit, IconTrashX} from "@tabler/icons-react";
import {formatDate, formatNumber} from "../../common/common.js";
import RenderCash from "../../components/renderCash/RenderCash.jsx";
import UpdateWallet from "./UpdateWallet.jsx";
import {confirm} from "../../components/alert/createConfirmation.js";
import toast from "react-hot-toast";

const Wallet = (props) => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState()
    const [idSelected, setIdSelected] = useState(undefined)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        getAllManagement()
    }, [page]);

    const getAllManagement = () => {
        setIsLoading(true)
        callApi('pkg_bud_wallet.get_all', {
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

    const handleOpenCreate = () => {
        setIdSelected(undefined)
        setMode('create')
        onOpen(true)
    }

    const handleOpenDetail = (id) => {
        setIdSelected(id)
        setMode('edit')
        onOpen(true)
    }

    const handlerSuccess = () => {
        getAllManagement()
    }

    const handleOnClick = async (id) => {
        if (await confirm({
            confirmation: 'Are you sure you want to delete this wallet?',
            options: {
                confirm: {
                    text: 'Delete',
                    color: 'danger'
                }
            }
        })) {
            setIsLoading(true)
            callApi('pkg_bud_wallet.delete_item', {
                pk_bud_wallet: id
            }, () => {
                toast.success('Delete successfully.')
                getAllManagement()
            }, (err) => {
                setIsLoading(false)
            })
        }
    }

    return (
        <Fragment>
            <UpdateWallet
                mode={mode}
                id={idSelected}
                isOpen={isOpen}
                onClose={() => {
                }}
                onOpenChange={onOpenChange}
                onSuccess={handlerSuccess}
            />
            <div className={'flex items-center justify-end gap-3'}>
                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onClick={handleOpenCreate}
                >
                    Add wallet
                </Button>
            </div>
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
                        <TableColumn key="C_NAME">Name</TableColumn>
                        <TableColumn key="C_CASH_IN">Cash</TableColumn>
                        <TableColumn key="C_DATE">Create date</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data ?? []}
                        isLoading={isLoading}
                        loadingContent={<TableLoading/>}
                        emptyContent={<TableEmpty isLoading={isLoading}/>}
                    >
                        {(item) => (
                            <TableRow key={item?.PK_BUD_WALLET}>
                                <TableCell>{item?.TB_ROW_NUM}</TableCell>
                                <TableCell>{item?.C_NAME}</TableCell>
                                <TableCell><RenderCash cash={item?.C_BALANCE}/></TableCell>
                                <TableCell>{formatDate(item?.C_CREATED_DATE)}</TableCell>
                                <TableCell>
                                    <div className={'flex items-center gap-1'}>
                                        <IconEdit
                                            className={'text-blue-500 cursor-pointer'}
                                            size={16}
                                            onClick={() => {handleOpenDetail(item?.PK_BUD_WALLET)}}
                                        />
                                        <IconTrashX
                                            className={'text-rose-500 cursor-pointer'}
                                            size={16}
                                            onClick={() => {handleOnClick(item?.PK_BUD_WALLET)}}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Fragment>
    )
}

export default Wallet;