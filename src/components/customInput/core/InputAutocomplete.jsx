import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import PropTypes from "prop-types";
import {IconAsterisk} from "@tabler/icons-react";
import {useController} from "react-hook-form";

const InputAutocomplete = (props) => {
	const {
		field,
		fieldState: { invalid, isTouched, isDirty , error},
		formState: { touchedFields, dirtyFields }
	} = useController({
		name: props.name,
		control: props.control,
		rules: props.rules,
	});

	return (
		<Autocomplete
			// react form hook
			onSelectionChange={field.onChange}
			onBlur={field.onBlur}
			value={field.value}
			ref={field.ref}

			// nextUI
			isInvalid={!!error}
			errorMessage={error?.message}

			size={'sm'}
			defaultItems={[
				{label: '1', value: '1'},
				{label: '2', value: '2'},
			]}
			type={'text'}
			variant={'bordered'}
			label={<div className={'flex items-center justify-center gap-1'}>
				{props.label} {!!props.rules?.required && <IconAsterisk size={10} className={'text-rose-600'}/>}
			</div>}
			placeholder={props.placeholder}
		>
			{(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
		</Autocomplete>
	)
}

export default InputAutocomplete;