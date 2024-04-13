import {Fragment, useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import {
	Button,
	Pagination, Spinner,
	Table,
	TableBody, TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import {formatNumber} from "../../common.js";
import TableLoading from "../../layout/TableLoading.jsx";
import TableEmpty from "../../layout/TableEmpty.jsx";

const Transaction = (props) => {
	const [page, setPage] = useState(1)
	const [pages, setPages] = useState(0)
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		getAllManagement()
	}, [page]);

	const getAllManagement = () => {
		setIsLoading(true)
		callApi('pkg_bud_management.get_all', {
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
			{/*<div className={'text-right'}>*/}
			{/*	<Button size="sm" variant="flat" color="primary">*/}
			{/*		Add*/}
			{/*	</Button>*/}
			{/*</div>*/}
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
						<TableColumn key="C_HOLDER_NAME">Name</TableColumn>
						<TableColumn key="C_CASH_IN">Cash in</TableColumn>
						<TableColumn key="C_CASH_OUT">Cash out</TableColumn>
						<TableColumn key="C_DATE">Date</TableColumn>
					</TableHeader>
					<TableBody
						items={data ?? []}
						isLoading={isLoading}
						loadingContent={<TableLoading/>}
						emptyContent={<TableEmpty isLoading={isLoading}/>}
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

export default Transaction