import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {required} from "../../common/validate.js";
import InputNumber from "../../components/customInput/InputNumber.jsx";
import InputSelectHolder from "../../components/customInput/InputSelectHolder.jsx";
import InputArrowTransaction from "../../components/customInput/InputArrowTransaction.jsx";
import InputText from "../../components/customInput/InputText.jsx";
import InputDatetime from "../../components/customInput/InputDatetime.jsx";
import {getLocalTimeZone, now} from "@internationalized/date";
import callApi from "../../apis/GatewayApi.js";
import {formatZoneTimeToString, revertFormatNumber} from "../../common/common.js";
import toast from "react-hot-toast";

const UpdateTransaction = (props) => {
	const [formAmount, setFormAmount] = useState('0')
	const [formHolder, setFormHolder] = useState(undefined)
	const [formStateArrow, setFormStateArrow] = useState('UP')
	const [formNote, setFormNote] = useState('')
	const [formDate, setFormDate] = useState(now(getLocalTimeZone()))

	const [stateUpdate, setStateUpdate] = useState('init')
	const [triggerResetInput, setTriggerResetInput] = useState(false)

	useEffect(() => {
		resetInput()
	}, [props.isOpen]);

	const resetInput = () => {
		setFormAmount('0')
		setFormHolder(undefined)
		setFormStateArrow('UP')
		setFormNote('')
		setFormDate(now(getLocalTimeZone()))

		setStateUpdate('init')
		setTriggerResetInput(!triggerResetInput)
	}

	const onSubmit = (event, onClose) => {
		event.preventDefault()

		setStateUpdate('pending')

		callApi('pkg_bud_management.update_item', {
			fk_bud_holder: formHolder,
			cash_in: formStateArrow === 'UP' ? revertFormatNumber(formAmount) : 0,
			cash_out: formStateArrow === 'DOWN' ? revertFormatNumber(formAmount) : 0,
			note: formNote,
			type: 'NORMAL',
			date: formatZoneTimeToString(formDate),
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
				<form onSubmit={(event) => {
					onSubmit(event, onClose)
				}}>
					<ModalHeader
						className="flex flex-col gap-1">{props.mode === 'edit' ? 'Edit transaction' : 'Add transaction'}</ModalHeader>
					<ModalBody>
						<InputSelectHolder
							name={'Holder'}
							label={'Holder'}
							placeholder={'Please select the holder'}
							value={formHolder}
							onValueChange={setFormHolder}
							triggerReset={triggerResetInput}
							validates={[required()]}
						/>
						<div className={'flex flex-row gap-1 justify-center items-center'}>
							<InputArrowTransaction
								stateArrow={formStateArrow}
								onChange={setFormStateArrow}
							/>
							<InputNumber
								name={'Amount'}
								label={'Amount'}
								placeholder={'Please enter the amount'}
								value={formAmount}
								onValueChange={setFormAmount}
								triggerReset={triggerResetInput}
								validates={[required()]}
							/>
						</div>
						<div className={'max-w-[284px]'}>
							<InputDatetime
								name={'Date'}
								value={formDate}
								label={'Date'}
								onValueChange={setFormDate}
								triggerReset={triggerResetInput}
							/>
						</div>
						<InputText
							name={'Note'}
							value={formNote}
							label={'Note'}
							placeholder={'Write some note'}
							onValueChange={setFormNote}
							triggerReset={triggerResetInput}
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