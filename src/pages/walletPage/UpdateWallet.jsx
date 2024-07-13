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

const UpdateWallet = (props) => {
	const [stateUpdate, setStateUpdate] = useState('init')

	const { control, handleSubmit, reset, setValue, getValues, watch } = useForm({
		defaultValues: {
			name: '',
			balance: '',
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
		callApi('pkg_bud_wallet.get_item', {
			pk_bud_wallet: props.id
		}, (data) => {
			setValue('name', data[0].C_NAME)
			setValue('balance', formatNumber(data[0].C_BALANCE))
		})
	}

	const onSubmit = (data, onClose) => {
		setStateUpdate('pending')

		callApi('pkg_bud_wallet.update_item', {
			pk_bud_wallet: props.id,
			name: data.name,
			balance: revertFormatNumber(data.balance),
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
						className="flex flex-col gap-1">{props.mode === 'edit' ? 'Edit wallet' : 'Add wallet'}</ModalHeader>
					<ModalBody>
						<InputText
							name={'name'}
							label={'Wallet name'}
							placeholder={'Please enter name wallet'}
							control={control}
							rules={{
								required: 'Field is required'
							}}
						/>
						<InputNumber
							name={'balance'}
							label={'Balance'}
							placeholder={'Please enter the balance'}
							control={control}
							rules={{
								required: 'Field is required',
								min: {
									value: 1,
									message: 'Must larger than 0'
								}
							}}
							isDisabled={props.mode === 'edit'}
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

UpdateWallet.propTypes = {
	onOpenChange: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'add']),
	id: PropTypes.string,
	onSuccess: PropTypes.func,
}

export default UpdateWallet