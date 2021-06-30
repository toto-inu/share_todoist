import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
// 	value: 0,
// 	status: 'idle',
// }

// reducer
const counterSlice = createSlice({
	name: 'counter', // reducers名
	initialState: 0, // initialState
	reducers: { // reducers
		increment: state => {
			console.log(state);
			return state + 1
		},
		decrement: state => state - 1
	}
})

export const { increment, decrement } = counterSlice.actions;
export const selectCount = (state) => state.counter;
export const counterReducers = counterSlice.reducer;