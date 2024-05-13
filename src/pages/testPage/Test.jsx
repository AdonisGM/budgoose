import {useForm, Controller, useController} from "react-hook-form"

import {Autocomplete, AutocompleteItem, Button, DatePicker, Input} from "@nextui-org/react";
import {useEffect} from "react";
import {formatNumber} from "../../common/common.js";
import {IconArrowBigUpFilled, IconAsterisk} from "@tabler/icons-react";
import InputText from "../../components/customInput/InputText.jsx";
import InputNumber from "../../components/customInput/InputNumber.jsx";
import {getLocalTimeZone, now} from "@internationalized/date";
import InputDatetime from "../../components/customInput/InputDatetime.jsx";
import {motion} from "framer-motion";

const Test = () => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			name: "aaaaa",
			cash: formatNumber('123123123'),
			date: now(getLocalTimeZone()),
			status: 'DOWN'
		}
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<form
			className={'w-[300px] m-2 gap-2 flex flex-col'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<InputText
				name={'name'}
				label={'Name'}
				placeholder={'Enter your name'}
				control={control}
				rules={{
					required: 'Thông tin này không được để trống'
				}}
			/>
			<InputNumber
				name={'cash'}
				label={'Cash'}
				placeholder={'Cash here!'}
				control={control}
				rules={{
					required: 'Thông tin này không được để trống'
				}}
			/>
			<InputDatetime
				name={'date'}
				label={'Date'}
				placeholder={'Hmm'}
				control={control}
				rules={{
					required: 'Thông tin này không được để trống'
				}}
			/>
			<CustomInputText
				name={'status'}
				control={control}
			/>
			<Button
				type="submit"
			>
				Submit
			</Button>
		</form>
	)
}

const CustomInputText = (props) => {
	const {
		field,
		fieldState: { invalid, isTouched, isDirty , error},
		formState: { touchedFields, dirtyFields }
	} = useController({
		name: props.name,
		control: props.control,
	});

	const handleChange = () => {
		field.onChange(field.value === 'UP' ? 'DOWN' : 'UP')
	}

	return (
		<Button
			isIconOnly
			color={field.value === 'DOWN' ? 'danger' : 'success'}
			aria-label={'Like'}
			onClick={handleChange}
		>
			<motion.div
				animate={field.value === 'DOWN' ? 'down' : 'up'}
				variants={{
					down: {
						rotate: 180
					},
					up: {
						rotate: 0
					}
				}}
				transition={{duration: 0.4}}
			>
				<IconArrowBigUpFilled className={'text-white'}/>
			</motion.div>
		</Button>
	)
}

export default Test;