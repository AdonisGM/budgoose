import { createSlice } from '@reduxjs/toolkit'

export const hideAmountSlice = createSlice({
	name: 'hideAmount',
	initialState: {
		value: !!(localStorage.getItem('hideAmount'))
	},
	reducers: {
		change: state => {
			state.value = !state.value
		},
	}
})

// Action creators are generated for each case reducer function
export const { change } = hideAmountSlice.actions

export default hideAmountSlice.reducer