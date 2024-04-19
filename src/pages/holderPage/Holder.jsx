import {Fragment, useEffect, useState} from "react";
import {Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import TableLoading from "../../layout/TableLoading.jsx";
import TableEmpty from "../../layout/TableEmpty.jsx";
import {IconArrowBigUpFilled, IconEdit, IconTrashX} from "@tabler/icons-react";
import {formatDate, formatNumber} from "../../common/common.js";
import callApi from "../../apis/GatewayApi.js";

const Holder = () => {
	const [page, setPage] = useState(1)
	const [pages, setPages] = useState(0)
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [mode, setMode] = useState()
	const [idSelected, setIdSelected] = useState(undefined)

	useEffect(() => {
		getAllManagement()
	}, [page]);

	const getAllManagement = () => {
		setIsLoading(true)
		callApi('pkg_bud_holder.get_all', {
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
						<TableColumn>#</TableColumn>
						<TableColumn>Username</TableColumn>
						<TableColumn>Name</TableColumn>
						<TableColumn>Cash</TableColumn>
						<TableColumn>Note</TableColumn>
						<TableColumn>Action</TableColumn>
					</TableHeader>
					<TableBody
						items={data ?? []}
						isLoading={isLoading}
						loadingContent={<TableLoading/>}
						emptyContent={<TableEmpty isLoading={isLoading}/>}
					>
						{(item) => (
							<TableRow key={item?.PK_BUD_HOLDER}>
								<TableCell>{item?.TB_ROW_NUM}</TableCell>
								<TableCell>{item?.C_HOLDER_USERNAME}</TableCell>
								<TableCell>{item?.C_HOLDER_NAME}</TableCell>
								<TableCell>
									<div className={`flex gap-1 ${item?.C_CASH_BALANCE >= 0 ? `text-green-500` : `text-rose-500`}`}>
										{formatNumber(item?.C_CASH_BALANCE)}
									</div>
								</TableCell>
								<TableCell>{item?.C_NOTE}</TableCell>
								<TableCell>
									<div className={'flex items-center gap-1'}>
										<IconEdit
											className={'text-blue-500 cursor-pointer'}
											size={16}
										/>
										<IconTrashX
											className={'text-rose-500 cursor-pointer'}
											size={16}
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

export default Holder