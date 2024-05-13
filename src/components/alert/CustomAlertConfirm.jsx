import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

const CustomAlertConfirm = ({show, proceed, confirmation, options}) => (
	<Modal
		size={'sm'}
		backdrop={'blur'}
		isOpen={show}
		onOpenChange={(status) => {
			proceed(status)
		}}
	>
		<ModalContent>
			<ModalHeader className="flex flex-col gap-1">Alert confirm!</ModalHeader>
			<ModalBody>
				<p className={'text-default-800 text-sm'}>
					{confirmation}
				</p>
			</ModalBody>
			<ModalFooter>
				<Button
					size={'sm'}
					variant={'flat'}
					color={options?.cancel?.color ? options?.cancel?.color : 'default'}
					onClick={() => proceed(false)}
				>
					{options?.cancel?.text ? options?.cancel?.text : 'Cancel'}
				</Button>
				<Button
					size={'sm'}
					variant={'flat'}
					color={options?.confirm?.color ? options?.confirm?.color : 'primary'}
					onClick={() => proceed(true)}
				>
					{options?.confirm?.text ? options?.confirm?.text : 'Confirm'}
				</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)

CustomAlertConfirm.propTypes = {
	show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
	proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
	confirmation: PropTypes.string,  // arguments of your confirm function
	options: PropTypes.object        // arguments of your confirm function
}

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(CustomAlertConfirm);