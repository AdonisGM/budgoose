import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import InputNumber from "../../components/customInput/InputNumber.jsx";
import InputSelectHolder from "../../components/customInput/InputSelectHolder.jsx";
import InputArrowTransaction from "../../components/customInput/InputArrowTransaction.jsx";
import InputText from "../../components/customInput/InputText.jsx";
import InputDatetime from "../../components/customInput/InputDatetime.jsx";
import {getLocalTimeZone, now} from "@internationalized/date";
import callApi from "../../apis/GatewayApi.js";
import {formatZoneTimeToString, revertFormatNumber} from "../../common/common.js";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

const UpdateTransaction = (props) => {
	const [stateUpdate, setStateUpdate] = useState('init')

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			holder: '',
			cash: '',
			note: '',
			date: now(getLocalTimeZone()),
			stateArrow: 'UP'
		}
	})

	useEffect(() => {
		reset();
	}, [props.isOpen]);

	const onSubmit = (data, onClose) => {
		setStateUpdate('pending')

		callApi('pkg_bud_management.update_item', {
			fk_bud_holder: data.holder,
			cash_in: data.cash === 'UP' ? revertFormatNumber(data.cash) : 0,
			cash_out: data.cash === 'DOWN' ? revertFormatNumber(data.cash) : 0,
			note: data.note,
			type: 'NORMAL',
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
						<div className={'flex flex-row gap-1 justify-center items-center'}>
							<InputArrowTransaction
								name={'stateArrow'}
								control={control}
							/>
							<InputNumber
								name={'amount'}
								label={'Amount'}
								placeholder={'Please enter the amount'}
								control={control}
								rules={{
									required: 'Field is required'
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

UpdateTransaction.propTypes = {
	onOpenChange: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'add']),
	id: PropTypes.string,
	onSuccess: PropTypes.func,
}

export default UpdateTransaction