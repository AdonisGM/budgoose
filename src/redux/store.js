import { configureStore } from '@reduxjs/toolkit'
import hideAmount from "./slice/hideAmount.js";

export default configureStore({
	reducer: {
		hideAmount: hideAmount
	}
})