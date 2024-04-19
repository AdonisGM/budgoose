import PropTypes from "prop-types";

const ErrorToast = (props) => {
	return <div>
		<p className={'text-gray-900 text-sm mb-1'}>{props.message}</p>
		<p className={'text-gray-400 text-[8px]'}>Code: {props.code}</p>
	</div>
}

ErrorToast.propTypes = {
	message: PropTypes.string,
	code: PropTypes.string
}

export default ErrorToast;