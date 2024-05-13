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
			defaultItems={props.data}
			type={'text'}
			variant={'flat'}
			label={<div className={'flex items-center justify-center gap-1'}>
				{props.label} {!!props.rules?.required && <IconAsterisk size={10} className={'text-rose-600'}/>}
			</div>}
			placeholder={props.placeholder}
			isDisabled={props.isDisabled || props.isLoading}
			isLoading={props.isLoading}
		>
			{(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
		</Autocomplete>
	)
}

export default InputAutocomplete;