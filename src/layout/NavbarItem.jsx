import PropTypes from "prop-types";
import {createElement, useState} from "react";
import { motion } from "framer-motion"

const configColor = {
	red: {
		textColor: 'text-red-600',
		backgroundColor: 'bg-red-200',
		backgroundColor1: 'bg-red-100',
	},
	sky: {
		textColor: 'text-sky-600',
		backgroundColor: 'bg-sky-200',
		backgroundColor1: 'bg-sky-100',
	},
	orange: {
		textColor: 'text-orange-600',
		backgroundColor: 'bg-orange-200',
		backgroundColor1: 'bg-orange-100',
	},
	green: {
		textColor: 'text-green-600',
		backgroundColor: 'bg-green-200',
		backgroundColor1: 'bg-green-100',
	},
	fuchsia: {
		textColor: 'text-fuchsia-600',
		backgroundColor: 'bg-fuchsia-200',
		backgroundColor1: 'bg-fuchsia-100',
	},
	blue: {
		textColor: 'text-blue-600',
		backgroundColor: 'bg-blue-200',
		backgroundColor1: 'bg-blue-100',
	},
	default: {
		textColor: 'text-slate-600',
		backgroundColor: 'bg-slate-200',
		backgroundColor1: 'bg-slate-100',
	}
}

const NavbarItem = (props) => {
	const [isHover, setIsHover] = useState(false)

	const backgroundColor = configColor[props.color] ? configColor[props.color].backgroundColor : configColor.default.backgroundColor;
	const backgroundColor1 = configColor[props.color] ? configColor[props.color].backgroundColor1 : configColor.default.backgroundColor1;
	const textColor = configColor[props.color] ? configColor[props.color].textColor : configColor.default.textColor;

	const CustomIcon = createElement(props.icon, {
			size: 16,
			className: textColor,
			stroke: 2
		})

	return <motion.div
		className={'rounded-lg h-10 my-1 mx-1 select-none relative cursor-pointer'}
		whileTap={{ scale: 0.97 }}
		initial={'close'}
		onMouseEnter={() => {setIsHover(true);}}
		onMouseLeave={() => {setIsHover(false)}}
	>
		<motion.div
			className={`${backgroundColor1} w-10 h-full absolute z-10 rounded-lg`}
			animate={props.isActive ? 'selected' : isHover ? 'open' : 'close'}
			variants={{
				open: {
					height: '100%',
					width: '40%',
				},
				close: {
					height: '100%',
					width: '2.5em',
				},
				selected: {
					height: '100%',
					width: '100%',
				}
			}}
			transition={{duration: 0.25}}
		/>

		<div className={'flex flex-row items-center gap-3 z-20 h-10 absolute'}>
			<div className={`h-10 w-10 flex items-center justify-center rounded-lg ${backgroundColor}`}>
				{CustomIcon}
			</div>
			<p className={`text-sm ${textColor}`}>
				{props.name}
			</p>
		</div>
	</motion.div>
}

NavbarItem.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string,
	onClick: PropTypes.func,
	color: PropTypes.string,
	icon: PropTypes.element.isRequired,
	isActive: PropTypes.bool,
}

export default NavbarItem