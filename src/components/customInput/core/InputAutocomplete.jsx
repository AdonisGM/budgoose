import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import PropTypes from "prop-types";
import {IconAsterisk} from "@tabler/icons-react";
import {useEffect, useState} from "react";

const InputAutocomplete = (props) => {
	const [isRequired, setIsRequired] = useState(false)
	const [isTouch, setIsTouch] = useState(false)
	const [messageError, setMessageError] = useState(undefined)
	const [isValid, setIsValid] = useState(true)

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

	useEffect(() => {
		const hasFunctionRequired = props.validates?.find((e) => {
			return e.name === 'required'
		})
		setIsRequired(!!hasFunctionRequired)
	}, []);

	return (
		<Autocomplete
			size={'sm'}
			defaultItems={props.data}
			type={'text'}
			variant={'bordered'}
			name={props.name}
			value={props.value}
			label={<div className={'flex items-center justify-center gap-1'}>
				{props.label} {isRequired && <IconAsterisk size={10} className={'text-rose-600'}/>}
			</div>}
			placeholder={props.placeholder}
			isDisabled={props.isDisabled || props.isLoading}
			isLoading={props.isLoading}
			isInvalid={!isValid && isTouch}
			errorMessage={messageError}
			onSelectionChange={props.onValueChange}
			onClick={(event) => {setIsTouch(true); event.target.select()}}
		>
			{(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
		</Autocomplete>
	);
}

InputAutocomplete.propTypes = {
	data: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	triggerReset: PropTypes.bool,

	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,

	onValueChange: PropTypes.func,

	validates: PropTypes.arrayOf(PropTypes.func)
}

export default InputAutocomplete;