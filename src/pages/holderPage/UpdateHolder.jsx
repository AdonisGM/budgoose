import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import callApi from "../../apis/GatewayApi.js";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import InputText from "../../components/customInput/InputText.jsx";

const UpdateHolder = (props) => {
	const [stateUpdate, setStateUpdate] = useState('init')

	const { control, handleSubmit, reset, setValue } = useForm({
		defaultValues: {
			name: '',
			note: '',
		}
	})

	useEffect(() => {
		if (props.isOpen) {
			if (props.mode === 'edit') {
				getDetailHolder()
			}	else {
				// setValue('date', now(getLocalTimeZone()))
			}
		} else {
			reset();
		}
	}, [props.isOpen]);

	const getDetailHolder = () => {
		callApi('pkg_bud_holder.get_item', {
			pk_bud_holder: props.id
		}, (data) => {
			setValue('name', data[0].C_HOLDER_NAME)
			setValue('note', data[0].C_NOTE)
		})
	}

	const onSubmit = (data, onClose) => {
		setStateUpdate('pending')

		callApi('pkg_bud_holder.update_item', {
			pk_bud_holder: props.id,
			name: data.name,
			note: data.note,
		}, () => {
			toast.success('Create successfully.')
			setStateUpdate('init')
			props.onSuccess()
			onClose()
		}, () => {
			setStateUpdate('init')
		})
	}

	return (
		<Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
						<ModalHeader
							className="flex flex-col gap-1">{props.mode === 'edit' ? 'Edit holder' : 'Add holder'}</ModalHeader>
						<ModalBody>
							<InputText
								name={'name'}
								label={'Name holder'}
								placeholder={'Your friend or ...'}
								control={control}
								rules={{
									required: 'Field is required'
								}}
							/>
							<InputText
								name={'note'}
								label={'Note'}
								placeholder={'something to remind you'}
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
	)
}

UpdateHolder.propTypes = {
	onOpenChange: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
	mode: PropTypes.oneOf(['edit', 'add']),
	id: PropTypes.string,
	onSuccess: PropTypes.func,
}

export default UpdateHolder