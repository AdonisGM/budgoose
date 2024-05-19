import {Fragment, useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import {
	Button,
	Pagination,
	Table,
	TableBody, TableCell,
	TableColumn,
	TableHeader,
	TableRow, useDisclosure,
} from "@nextui-org/react";
import {formatDate, formatNumber} from "../../common/common.js";
import TableLoading from "../../layout/TableLoading.jsx";
import TableEmpty from "../../layout/TableEmpty.jsx";
import UpdateTransaction from "./UpdateTransaction.jsx";
import {IconArrowBigUpFilled, IconEdit, IconTrashX} from "@tabler/icons-react";
import { confirmWrapper, confirm } from '../../components/alert/createConfirmation.js'
import toast from "react-hot-toast";
import CalculateInvoice from "./CalculateInvoice.jsx";

const Transaction = () => {
	const [page, setPage] = useState(1)
	const [pages, setPages] = useState(0)
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [mode, setMode] = useState()
	const [idSelected, setIdSelected] = useState(undefined)

	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const disclosureCalcInvoice = useDisclosure();

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

	const handlerSuccess = () => {
		getAllManagement()
	}

	const handleOnClick = async (id) => {
		if (await confirm({
			confirmation: 'Are you sure you want to delete this transaction?',
			options: {
				confirm: {
					text: 'Delete',
					color: 'danger'
				}
			}
		})) {
			setIsLoading(true)
			callApi('pkg_bud_management.delete_item', {
				pk_bud_management: id
			}, () => {
				toast.success('Delete successfully.')
				getAllManagement()
			}, (err) => {
				console.log(err)
			})
		}
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

	const handleOpenCalculateInvoice = () => {
		disclosureCalcInvoice.onOpen(true)
	}

	return (
		<Fragment>
			<UpdateTransaction
				mode={mode}
				id={idSelected}
				isOpen={isOpen}
				onClose={() => {}}
				onOpenChange={onOpenChange}
				onSuccess={handlerSuccess}
			/>
			<CalculateInvoice
				isOpen={disclosureCalcInvoice.isOpen}
				onClose={() => {}}
				onOpenChange={disclosureCalcInvoice.onOpenChange}
			/>
			<div className={'flex items-center justify-end gap-3'}>
				<Button
					size="sm"
					variant="flat"
					color="primary"
					onClick={handleOpenCalculateInvoice}
				>
					Calculate Invoice
				</Button>
				<Button
					size="sm"
					variant="flat"
					color="primary"
					onClick={handleOpenCreate}
				>
					Add transaction
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
						<TableColumn key="C_HOLDER_NAME">Name</TableColumn>
						<TableColumn key="C_CASH_IN">Cash</TableColumn>
						<TableColumn key="C_NOTE">Note</TableColumn>
						<TableColumn key="C_DATE">Date</TableColumn>
						<TableColumn>Action</TableColumn>
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
								<TableCell>
									<div className={'flex items-center gap-1 h-full'}>
										<IconArrowBigUpFilled className={`${item?.C_CASH_IN !== 0 ? `text-green-500` : `text-rose-500 rotate-180`}`} size={14}/>
										{formatNumber(item?.C_CASH_IN === 0 ? item?.C_CASH_OUT : item?.C_CASH_IN)}
									</div>
								</TableCell>
								<TableCell>{item?.C_NOTE}</TableCell>
								<TableCell>{formatDate(item?.C_DATE)}</TableCell>
								<TableCell>
									<div className={'flex items-center gap-1'}>
										<IconEdit
											className={'text-blue-500 cursor-pointer'}
											size={16}
											onClick={() => {handleOpenDetail(item?.PK_BUD_MANAGEMENT)}}
										/>
										<IconTrashX
											className={'text-rose-500 cursor-pointer'}
											size={16}
											onClick={() => {handleOnClick(item?.PK_BUD_MANAGEMENT)}}
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

export default Transaction