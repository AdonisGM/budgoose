import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {DatePicker} from "@nextui-org/react";
import {IconAsterisk} from "@tabler/icons-react";

const InputDatetime = (props) => {
	const [isRequired, setIsRequired] = useState(false)
	const [isTouch, setIsTouch] = useState(false)
	const [messageError, setMessageError] = useState(undefined)
	const [isValid, setIsValid] = useState(true)

	useEffect(() => {
		const hasFunctionRequired = props.validates?.find((e) => {
			return e.name === 'required'
		})
		setIsRequired(!!hasFunctionRequired)
	}, []);

	useEffect(() => {
		setIsTouch(false)
		setIsValid(true)
	}, [props.triggerReset]);

	useEffect(() => {
		if (props.validates === null || props.validates === undefined || props.validates.length === 0) return;
		let message = undefined

		for (const validate of props.validates) {
			message = validate(props.value)

			if (message) {
				break;
			}
		}

		if (message) {
			setMessageError(message)
			setIsValid(false)
		} else {
			setMessageError(undefined)
			setIsValid(true)
		}
	}, [props.value]);

	return <DatePicker
			size={'sm'}
			variant={'bordered'}
			name={props.name}
			value={props.value}
			label={<div className={'flex items-center justify-start gap-1'}>
				{props.label} {isRequired && <IconAsterisk size={10} className={'text-rose-600'}/>}
			</div>}
			placeholder={props.placeholder}
			isInvalid={!isValid && isTouch}
			errorMessage={messageError}
			isDisabled={props.isDisabled}
			onChange={props.onValueChange}
			onClick={() => {setIsTouch(true);}}
			hideTimeZone={false}
			showMonthAndYearPickers={true}
		/>
}

InputDatetime.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	triggerReset: PropTypes.bool,

	isDisabled: PropTypes.bool,

	onValueChange: PropTypes.func,

	validates: PropTypes.arrayOf(PropTypes.func)
}

export default InputDatetime