import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; patch: Partial<Task> }>) => {
      const { id, patch } = action.payload;
      const idx = state.tasks.findIndex(t => t.id === id);
      if (idx !== -1) {
        state.tasks[idx] = { ...state.tasks[idx], ...patch };
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer

