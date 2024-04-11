import {Fragment, useEffect, useState} from "react";
import {
    Button, getKeyValue,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import callApi from "../../apis/GatewayApi.js";
import {formatNumber} from "../../common.js";

const TableTransaction = () => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [data, setData] = useState()

    useEffect(() => {
        callApi('pkg_bud_management.get_all', {
            page: 1,
            size_page: 10
        }, (data) => {
            setData(data)
            if (data.length > 0) {
                setPages(Math.floor(data[0].TB_TOTAL_ROW/10))
            }
        }, (err) => {
            console.log(err)
        })
    }, []);

    return (
        <Fragment>
            <div className={'text-right'}>
                <Button size="sm" variant="flat" color="primary">
                    Add
                </Button>
            </div>
            <div className={'mt-5'}>
                <Table
                    aria-label="Example table with client async pagination"
                    bottomContent={
                        pages > 0 ? (
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader>
                        <TableColumn key="TB_ROW_NUM">#</TableColumn>
                        <TableColumn key="C_HOLDER_NAME">Name</TableColumn>
                        <TableColumn key="C_CASH_IN">Cash in</TableColumn>
                        <TableColumn key="C_CASH_OUT">Cash out</TableColumn>
                        <TableColumn key="C_DATE">Date</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data ?? []}
                    >
                        {(item) => (
                            <TableRow key={item?.PK_BUD_MANAGEMENT}>
                                <TableCell>{item?.TB_ROW_NUM}</TableCell>
                                <TableCell>{item?.C_HOLDER_NAME}</TableCell>
                                <TableCell>{formatNumber(item?.C_CASH_IN)}</TableCell>
                                <TableCell>{formatNumber(item?.C_CASH_OUT)}</TableCell>
                                <TableCell>{item?.C_DATE}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Fragment>
    )
}

export default TableTransaction