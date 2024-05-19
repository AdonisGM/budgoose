import PropTypes from "prop-types";
import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Pagination, Table, TableBody, TableCell, TableColumn,
	TableHeader, TableRow
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import InputSelectHolder from "../../components/customInput/InputSelectHolder.jsx";
import InputNumber from "../../components/customInput/InputNumber.jsx";
import {Controller, useFieldArray, useForm, useWatch} from "react-hook-form";
import {IconTrashX} from "@tabler/icons-react";
import TableLoading from "../../layout/TableLoading.jsx";
import TableEmpty from "../../layout/TableEmpty.jsx";
import {formatNumber, revertFormatNumber} from "../../common/common.js";
import { v4 as uuidv4 } from 'uuid';
import callApi from "../../apis/GatewayApi.js";

const CalculateInvoice = (props) => {
	const [dataDisplay, setDataDisplay] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const { control, handleSubmit, reset, setValue , getValues} = useForm({
		defaultValues: {
			listHolder: [
				{holder: '', rate: 0, cashOut: 0, pay: 0},
				{holder: '', rate: 0, cashOut: 0, pay: 0}
			],
			totalCashOut: 0,
			totalCashIn: 0,
			discount: 0,
			cashDiff: 0
		}
	})

	const { fields, append, prepend , remove} = useFieldArray({
		control,
		name: "listHolder",
	});

	useEffect(() => {
		resetForm()
	}, [props.isOpen]);

	const resetForm = () => {
		reset()
		setDataDisplay(undefined)
		setIsLoading(false)
	}

	const onSubmit = (data, onClose) => {
		setDataDisplay(undefined)
		setIsLoading(true)

		callApi('pkg_bud_holder.get_all', {}, (dataHolder) => {
			const holderData = dataHolder.map((e) => {
				return {
					value: e.PK_BUD_HOLDER,
					label: e.C_HOLDER_NAME
				}
			})

			console.log(data, holderData)

			setIsLoading(false)
			handleCalculateInvoice(data.listHolder, holderData)
		})
	}

	const addHolder = () => {
		append({holder: '', rate: 0, cashOut: 0, pay: 0})
	}

	const handleDeleteItem = (index) => {
		remove(index)
	}

	const handleCalculateInvoice = (sourceData, holderData) => {
		let data = JSON.parse(JSON.stringify(sourceData));

		data = data.map((e) => {
			return {
				holder: e.holder,
				rate: revertFormatNumber(e.rate),
				cashOut: revertFormatNumber(e.cashOut),
				pay: revertFormatNumber(e.pay)
			}
		})

		const totalCashOut = revertFormatNumber(getValues('totalCashIn'));
		console.log(totalCashOut)
		const totalRate = data.reduce((a, b) => a + b.rate, 0);


		const averagePerRate = totalCashOut / totalRate;

		data.forEach((holder) => {
			holder.cashActualOut = (holder.rate * averagePerRate);
			holder.cashDiff = holder.cashActualOut - holder.cashOut;
		})

		const listHolderNeedCashback = data.filter(item => item.cashDiff < 0).sort((a, b) => b.cashDiff - a.cashDiff)
		const listHolderLoan = data.filter(item => item.cashDiff > 0).sort((a, b) => b.cashDiff - a.cashDiff)

		let dataResult = []

		for (let i = 0; i < listHolderNeedCashback.length; i++) {
			const holderCashback = listHolderNeedCashback[i]

			for (let j = 0; j < listHolderLoan.length; j++) {
				const holderLoan = listHolderLoan[j]

				const diff = holderCashback.cashDiff - holderCashback.pay + holderLoan.cashDiff - holderLoan.pay
				if (diff >= 0) {
					dataResult.push({
						id: uuidv4(),
						nameHolderCashback: holderData.find(e => {
							return e.value === holderCashback.holder
						}).label,
						nameHolderLoan: holderData.find(e => {
							return e.value === holderLoan.holder
						}).label,
						amount: formatNumber(Math.round(- (holderCashback.cashDiff - holderCashback.pay))),
					})
					holderCashback.pay = holderCashback.cashDiff
					holderLoan.pay = -holderCashback.cashDiff
					break;
				} else {
					dataResult.push({
						id: uuidv4(),
						nameHolderCashback: holderData.find(e => {
							return e.value === holderCashback.holder
						}).label,
						nameHolderLoan: holderData.find(e => {
							return e.value === holderLoan.holder
						}).label,
						amount: formatNumber(Math.round(holderLoan.cashDiff - holderLoan.pay))
					})
					holderCashback.pay = holderLoan.cashDiff
					holderLoan.pay = holderLoan.cashDiff
				}
			}
		}

		console.log(dataResult)
		setDataDisplay(dataResult)
	}

	return (
		<Modal
			isOpen={props.isOpen}
			onOpenChange={props.onOpenChange}
			size={'5xl'}
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
						<ModalHeader
							className="flex flex-col gap-1">Calculate invoice</ModalHeader>
						<ModalBody>
							<div className={'flex space-x-4'}>
								<div className={'w-2/3'}>
									<div className={'gap-2 flex flex-col'}>
										{fields.map((field, index) => (
											<ConditionalInput key={field.id} {...{ control, index, field }} onDelete={handleDeleteItem}/>
										))}
									</div>
									<Button
										onPress={addHolder}
										color={'success'}
										className={'w-fit mt-2'}
										variant={'flat'}
										size={'sm'}
									>
										Add holder
									</Button>
								</div>
								<Divider orientation="vertical" />
								<div
									className={'w-1/3 flex flex-col gap-2'}
								>
									<InputNumber
										name={`totalCashOut`}
										label={'Total cash out'}
										control={control}
										isDisabled={true}
									/>
									<div className={'flex gap-2'}>
										<InputNumber
											name={`discount`}
											label={'Discount'}
											control={control}
										/>
										<InputNumber
											name={`cashDiff`}
											label={'Cash diff'}
											control={control}
										/>
									</div>
									<InputNumber
										name={`totalCashIn`}
										label={'Total cash in'}
										control={control}
									/>
								</div>
							</div>
							<div>
								{dataDisplay && (
									<Table
										isStriped={true}
									>
										<TableHeader>
											<TableColumn>Holder</TableColumn>
											<TableColumn></TableColumn>
											<TableColumn>Holder</TableColumn>
											<TableColumn>Cash</TableColumn>
											<TableColumn>Cash actual out</TableColumn>
										</TableHeader>
										<TableBody
											items={dataDisplay}
										>
											{(item, index) => (
												<TableRow key={item?.id}>
													<TableCell>{item.nameHolderCashback}</TableCell>
													<TableCell>{'<--'}</TableCell>
													<TableCell>{item.nameHolderLoan}</TableCell>
													<TableCell>{item.amount}</TableCell>
													<TableCell>{item.cashActualOut}</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								)}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color={'danger'}
								variant={'light'}
								onPress={onClose}
								size={'sm'}
							>
								Close
							</Button>
							<Button
								color={'primary'}
								variant={'flat'}
								type={'submit'}
								size={'sm'}
							>
								Save
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

const ConditionalInput = ({ control, index, field, onDelete}) => {
	const value = useWatch({
		name: "listHolder",
		control
	});

	const handleDeleteItem = () => {
		onDelete(index)
	}

	return (
		<div
			key={field.id}
			className={'flex flex-row gap-2 items-center'}
		>
			<InputSelectHolder
				name={`listHolder.${index}.holder`}
				label={'Holder'}
				placeholder={'Please select the holder'}
				control={control}
				rules={{
					required: 'Field is required'
				}}
			/>
			<div className={'w-[400px]'}>
				<InputNumber
					name={`listHolder.${index}.cashOut`}
					label={'Cash out'}
					control={control}
					rules={{
						required: 'Field is required',
					}}
				/>
			</div>
			<div className={'w-[280px]'}>
				<InputNumber
					name={`listHolder.${index}.rate`}
					label={'Rate out'}
					control={control}
					rules={{
						required: 'Field is required',
					}}
				/>
			</div>
			<Button isIconOnly color="danger" aria-label="Delete holder" onPress={handleDeleteItem}>
				<IconTrashX/>
			</Button>
		</div>
	);
};

CalculateInvoice.propTypes = {
	onOpenChange: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'add']),
	id: PropTypes.string,
	onSuccess: PropTypes.func,
}

export default CalculateInvoice