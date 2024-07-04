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

const UpdateTransaction = (props) => {
	const [stateUpdate, setStateUpdate] = useState('init')

	const { control, handleSubmit, reset, setValue, getValues, watch } = useForm({
		defaultValues: {
			holder: '',
			wallet: '',
			amount: '',
			note: '',
			date: undefined,
			stateArrow: 'UP',
			autoCreateTransfer: true
		}
	})
	const watchShowAge = watch("stateArrow")

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
		callApi('pkg_bud_management.get_item', {
			pk_bud_management: props.id
		}, (data) => {
			setValue('holder', data[0].FK_BUD_HOLDER)
			setValue('wallet', data[0].FK_BUD_WALLET)
			setValue('amount', formatNumber(data[0].C_CASH_IN ? data[0].C_CASH_IN : data[0].C_CASH_OUT))
			setValue('note', data[0].C_NOTE)
			setValue('date', parseAbsoluteToLocal(data[0].C_DATE))
			setValue('stateArrow', data[0].C_CASH_IN ? 'UP' : 'DOWN')
			setValue('autoCreateTransfer', !!data[0].FK_BUD_WALLET_TRANS)
		})
	}

	const onSubmit = (data, onClose) => {
		setStateUpdate('pending')

		callApi('pkg_bud_management.update_item', {
			pk_bud_management: props.id,
			fk_bud_holder: data.holder,
			fk_bud_wallet: data.wallet,
			cash_in: data.stateArrow === 'UP' ? revertFormatNumber(data.amount) : 0,
			cash_out: data.stateArrow === 'DOWN' ? revertFormatNumber(data.amount) : 0,
			note: data.note,
			type: 'NORMAL',
			date: formatZoneTimeToString(data.date),
			auto_create_transfer: data.stateArrow === 'UP' ? 1 : data.autoCreateTransfer ? 1 : 0
		}, () => {
			toast.success('Create successfully.')
			setStateUpdate('init')
			props.onSuccess()
			onClose()
		}, () => {
			setStateUpdate('init')
		})
	}

	return <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
		<ModalContent>
			{(onClose) => (
				<form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
					<ModalHeader
						className="flex flex-col gap-1">{props.mode === 'edit' ? 'Edit transaction' : 'Add transaction'}</ModalHeader>
					<ModalBody>
						<InputSelectHolder
							name={'holder'}
							label={'Holder'}
							placeholder={'Please select the holder'}
							control={control}
							rules={{
								required: 'Field is required'
							}}
						/>
						<InputSelectWallet
							name={'wallet'}
							label={'Wallet'}
							placeholder={'Please select the wallet'}
							control={control}
							rules={{
								required: 'Field is required'
							}}
						/>
						<div className={'flex flex-row gap-1 justify-center items-start'}>
							<InputArrowTransaction
								name={'stateArrow'}
								control={control}
								isDisabled={false}
							/>
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
						{watchShowAge === 'DOWN' && <InputSwitch
							name={'autoCreateTransfer'}
							label={'Auto create transfer'}
							control={control}
						/>}
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

UpdateTransaction.propTypes = {
	onOpenChange: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'add']),
	id: PropTypes.string,
	onSuccess: PropTypes.func,
}

export default UpdateTransaction