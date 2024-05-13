import {IconArrowBigUpFilled} from "@tabler/icons-react";
import {Button} from "@nextui-org/react";
import {motion} from "framer-motion";
import PropTypes from "prop-types";
import {useController} from "react-hook-form";

const InputArrowTransaction = (props) => {
	const {
		field,
		fieldState: { invalid, isTouched, isDirty , error},
		formState: { touchedFields, dirtyFields }
	} = useController({
		name: props.name,
		control: props.control,
	});

	const handleChange = () => {
		if (props.isDisabled) {
			return;
		}
		field.onChange(props.stateArrow === 'UP' ? 'DOWN' : 'UP')
	}

	return <Button
		isIconOnly
		color={props.stateArrow === 'DOWN' ? 'danger' : 'success'}
		aria-label={'Like'}
		onClick={handleChange}
	>
		<motion.div
			animate={props.stateArrow === 'DOWN' ? 'down' : 'up'}
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
}

InputArrowTransaction.propTypes = {
	stateArrow: PropTypes.string,
	onChange: PropTypes.func,
}

export default InputArrowTransaction