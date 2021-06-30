import { configureStore } from '@reduxjs/toolkit';
import { counterReducers } from '../modules/counter';
import { taskReducers } from '../modules/tasks';

export const store = configureStore({
  reducer: {
    counter: counterReducers,
    tasks: taskReducers
  },
});
