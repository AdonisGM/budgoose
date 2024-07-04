import {useDispatch, useSelector} from "react-redux";
import {formatNumber} from "../../common/common.js";
import {change} from '../../redux/slice/hideAmount.js'

const RenderCash = (props) => {
    const hideAmount = useSelector((state) => state.hideAmount.value)
    const dispatch = useDispatch()

    return <span
        onClick={() => dispatch(change())}
        className={'font-mono cursor-pointer'}
    >
        {hideAmount ? '**,***,***' : formatNumber(props.cash)}
    </span>
}

export default RenderCash;