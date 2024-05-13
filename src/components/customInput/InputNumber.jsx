import {Input} from "@nextui-org/react";
import {IconAsterisk} from "@tabler/icons-react";
import {formatNumber} from "../../common/common.js";
import {useController} from "react-hook-form";

const InputNumber = (props) => {
	const {
		field,
		fieldState: { invalid, isTouched, isDirty , error},
		formState: { touchedFields, dirtyFields }
	} = useController({
		name: props.name,
		control: props.control,
		rules: props.rules,
	});

	const processTextNumber = (value) => {
		let textNumber = value.replace(/[^0-9]/g, "")

		if (textNumber === '') {
			/* empty */
		} else if (Number(textNumber) === 0) {
			textNumber = '0'
		} else {
			textNumber = textNumber.replace(/^0+/g, "")
		}

		return formatNumber(textNumber)
	}

	const handleChangeValue = (value) => {
		const numberFormat = processTextNumber(value)
		field.onChange(numberFormat)
	}

	return (
		<Input
			// react form hook
			onValueChange={handleChangeValue}
			onBlur={field.onBlur}
			value={field.value}
			ref={field.ref}

			// nextUI
			isInvalid={!!error}
			errorMessage={error?.message}

			type={'text'}
			size={'sm'}
			variant={'flat'}
			label={<div className={'flex items-center justify-start gap-1'}>
				{props.label} {!!props.rules?.required && <IconAsterisk size={8} className={'text-rose-600'}/>}
			</div>}
			placeholder={props.placeholder}
			isDisabled={props.isDisabled}
		/>
	)
}

export default InputNumber;