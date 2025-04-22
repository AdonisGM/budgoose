import {useDispatch, useSelector} from "react-redux";
import {formatNumber} from "../../common/common.js";
import {change} from '../../redux/slice/hideAmount.js';
import {useState} from "react"

const RenderCash = (props) => {
    const hideAmount = useSelector((state) => state.hideAmount.value)
    const dispatch = useDispatch()

    const [preview, setPreview] = useState(!hideAmount)

    return <span
        onClick={() => dispatch(change())}
        onMouseEnter={() => setPreview(true)}
        onMouseLeave={() => setPreview(false)}
        className={'font-mono cursor-pointer'}
    >
        {(!preview && hideAmount) ? '**,***,***' : formatNumber(props.cash)}
    </span>
}

export default RenderCash;