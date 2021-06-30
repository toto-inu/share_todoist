import { createSlice } from '@reduxjs/toolkit';
import { todoTasks } from './mock';

const initialState = todoTasks;

const getChildIds = (id, tasks) => {
	const task = tasks.filter(task => task.id === id)[0];
	return task.childIds;
}

// reducer
const taskSlice = createSlice({
	name: 'tasks', // reducers名
	initialState, // initialState
	reducers: { // reducers
		setTask: (state, {payload: {content}}) => {
			const id = Math.max(...state.map(task=>task.id))+1;
			return [
				...state, 
				{ id, doneFlag: false, content, layer: 1, childIds: [] }
			]
		},
		doneTask: (state, {payload: {id}}) => {
			const targetIds = [id, ...getChildIds(id, state)];
			// [TODO]子要素もまとめてDoneにする
			return state.map(task => {
				if (targetIds.includes(task.id)){
					return {...task, doneFlag: true};
				}
				return task;
			})
		},
		deleteTask: (state, {payload: {id}}) => {
			const targetIds = [id, ...getChildIds(id, state)];
			// [TODO]子要素もまとめてDoneにする
			return state.filter(task => !targetIds.includes(task.id));
		}
	}
})

export const { setTask, doneTask, deleteTask } = taskSlice.actions;
export const selectTasks = (state) => state.tasks;
export const taskReducers = taskSlice.reducer;