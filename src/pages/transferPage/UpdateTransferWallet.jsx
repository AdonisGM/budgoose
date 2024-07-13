import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import InputNumber from "../../components/customInput/InputNumber.jsx";
import InputSelectHolder from "../../components/customInput/InputSelectHolder.jsx";
import InputArrowTransaction from "../../components/customInput/InputArrowTransaction.jsx";
import InputText from "../../components/customInput/InputText.jsx";
import InputDatetime from "../../components/customInput/InputDatetime.jsx";
import {getLocalTimeZone, now, parseAbsolute, parseAbsoluteToLocal, parseDateTime} from "@internationalized/date";
import callApi from "../../apis/GatewayApi.js";
import {formatNumber, formatZoneTimeToString, removeMilliseconds, revertFormatNumber} from "../../common/common.js";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import InputSelectWallet from "../../components/customInput/InputSelectWallet.jsx";
import InputSwitch from "../../components/customInput/InputSwitch.jsx";
import {IconArrowBigRightLinesFilled} from "@tabler/icons-react";

const UpdateTransferWallet = (props) => {
	const [stateUpdate, setStateUpdate] = useState('init')

	const { control, handleSubmit, reset, setValue, getValues, watch } = useForm({
		defaultValues: {
			wallet: '',
			targetWallet: '',
			amount: '',
			note: '',
			date: undefined
		}
	})

	useEffect(() => {
		if (props.isOpen) {
			if (props.mode === 'edit') {
				getDetailTransaction()
			}	else {
				setValue('date', now(getLocalTimeZone()))
			}
		} else {
			reset();
		}
	}, [props.isOpen]);

	const getDetailTransaction = () => {
		callApi('pkg_bud_wallet_trans.get_item', {
			pk_bud_wallet_trans: props.id
		}, (data) => {
			setValue('wallet', data[0].FK_BUD_WALLET)
			setValue('targetWallet', data[0].C_TARGET)
			setValue('amount', formatNumber(data[0].C_CASH_OUT))
			setValue('note', data[0].C_NOTE)
			setValue('date', parseAbsoluteToLocal(data[0].C_DATE))
		})
	}

	const onSubmit = (data, onClose) => {
		setStateUpdate('pending')

		callApi('pkg_bud_wallet_trans.update_item', {
			pk_bud_wallet_trans: props.id,
			fk_bud_wallet: data.wallet,
			cash_in: 0,
			cash_out: revertFormatNumber(data.amount),
			is_loan: 0,
			target: data.targetWallet,
			target_type: 'WALLET',
			note: data.note,
			date: formatZoneTimeToString(data.date),
		}, () => {
			toast.success('Create successfully.')
			setStateUpdate('init')
			props.onSuccess()
			onClose()
		}, () => {
			setStateUpdate('init')
		})
	}

	return <Modal
		isOpen={props.isOpen}
		onOpenChange={props.onOpenChange}
		size={'4xl'}
	>
		<ModalContent>
			{(onClose) => (
				<form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
					<ModalHeader
						className="flex flex-col gap-1">{props.mode === 'edit' ? 'Edit transfer wallet' : 'Add transfer wallet'}</ModalHeader>
					<ModalBody>
						<div className={'flex flex-row gap-1 justify-center items-center w-full'}>
							<InputSelectWallet
								name={'wallet'}
								label={'Wallet'}
								placeholder={'Please select the wallet'}
								control={control}
								rules={{
									required: 'Field is required'
								}}
							/>
							<div className={'flex flex-row gap-1 justify-center items-center w-40'}>
								<IconArrowBigRightLinesFilled size={24}/>
							</div>
							<InputSelectWallet
								name={'targetWallet'}
								label={'Wallet target'}
								placeholder={'Please select the wallet'}
								control={control}
								rules={{
									required: 'Field is required'
								}}
							/>
						</div>
						<div className={'flex flex-row gap-1 justify-center items-start'}>
							<InputNumber
								name={'amount'}
								label={'Amount'}
								placeholder={'Please enter the amount'}
								control={control}
								rules={{
									required: 'Field is required',
									min: {
										value: 1,
										message: 'Must larger than 0'
									}
								}}
							/>
						</div>
						<div className={'max-w-[284px]'}>
							<InputDatetime
								name={'date'}
								label={'Date'}
								control={control}
							/>
						</div>
						<InputText
							name={'note'}
							label={'Note'}
							placeholder={'Write some note'}
							control={control}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color={'danger'} variant={'light'} onPress={onClose}>
							Close
						</Button>
						<Button
							color={'primary'}
							variant={'flat'}
							type={'submit'}
							isLoading={stateUpdate === 'pending'}
						>
							Save
						</Button>
					</ModalFooter>
				</form>
			)}
		</ModalContent>
	</Modal>
}

UpdateTransferWallet.propTypes = {
	onOpenChange: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'add']),
	id: PropTypes.string,
	onSuccess: PropTypes.func,
}

export default UpdateTransferWallet