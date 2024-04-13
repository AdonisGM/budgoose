import tableEmpty from '../../public/table-empty.png'
import PropTypes from "prop-types";

const TableEmpty = (props) => {
	return <div className={'h-56 flex items-center justify-center'}>
		{!props.isLoading && <img
			className={'h-40 opacity-50'}
			src={tableEmpty}
			alt={'finding'}
		/>}
	</div>
}

TableEmpty.propTypes = {
	isLoading: PropTypes.bool,
}

export default TableEmpty;