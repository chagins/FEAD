import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { TTask } from 'shared/api';

const tasksAdapter = createEntityAdapter<TTask>();

type TTasksSlice = EntityState<TTask> & {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
};

const initialState: TTasksSlice = tasksAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const { reducer } = tasksSlice;
