/* eslint-disable no-param-reassign */ // redux toolkit use immer lib

import {
  createSlice,
  createEntityAdapter,
  EntityState,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { TTask, atlasApi } from 'shared/api';

export const fetchTasksQuery = createAsyncThunk<TTask[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await atlasApi.getTasksList();
      return response.data.documents;
    } catch (err) {
      let messageError = 'Fetch tasks error';
      if (err instanceof Error) {
        messageError = `${messageError}: ${err.message}`;
      }
      return rejectWithValue(messageError);
    }
  }
);

export const fetchTaskByIdQuery = createAsyncThunk<TTask, number, { rejectValue: string }>(
  'tasks/fetchTaskById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await atlasApi.getTaskById({ id });
      if (!response.data.document) {
        throw new Error(`task with id ${id} not found`);
      }
      return response.data.document;
    } catch (err) {
      let messageError = `Fetch task error`;
      if (err instanceof Error) {
        messageError = `${messageError}: ${err.message}`;
      }
      return rejectWithValue(messageError);
    }
  }
);

export const toggleTaskMutation = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string; state: RootState }
>('tasks/toggleTask', async (id: number, { rejectWithValue, getState }) => {
  try {
    const toggledTask = getState().tasks.entities[id];
    if (!toggledTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    const response = await atlasApi.updateTaskCompleteStatus({
      id: toggledTask.id,
      completed: !toggledTask.completed,
    });
    if (response.data.modifiedCount === 0) {
      throw new Error(`Task status with id: ${id} has not changed`);
    }
    return {
      id,
    };
  } catch (err) {
    let messageError = 'Toggle task error';
    if (err instanceof Error) {
      messageError = `${messageError}: ${err.message}`;
    }
    return rejectWithValue(messageError);
  }
});

const tasksAdapter = createEntityAdapter<TTask>({ sortComparer: (a, b) => a.id - b.id });

export type TQueryConfig = {
  completed?: boolean;
};

type TTasksSlice = EntityState<TTask> & {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | undefined;
  queryConfig: TQueryConfig;
};

const initialState: TTasksSlice = tasksAdapter.getInitialState({
  status: 'idle',
  error: undefined,
  queryConfig: {},
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addMultipleTasks(state, action: PayloadAction<TTask[]>) {
      tasksAdapter.setAll(state, action.payload);
    },
    addSingleTasks(state, action: PayloadAction<TTask>) {
      tasksAdapter.addOne(state, action.payload);
    },
    toggleTask(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const toggledTask = state.entities[id];
      if (toggledTask) {
        toggledTask.completed = !toggledTask.completed;
      }
    },
    setQueryConfig(state, action: PayloadAction<TQueryConfig>) {
      state.queryConfig = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasksQuery.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTasksQuery.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        tasksSlice.caseReducers.addMultipleTasks(state, action);
      })
      .addCase(fetchTasksQuery.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(toggleTaskMutation.fulfilled, (state, action) => {
        tasksSlice.caseReducers.toggleTask(state, action);
      })
      .addCase(toggleTaskMutation.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(fetchTaskByIdQuery.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTaskByIdQuery.fulfilled, (state, action) => {
        state.status = 'idle';
        tasksSlice.caseReducers.addSingleTasks(state, action);
      })
      .addCase(fetchTaskByIdQuery.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { selectById: selectTaskById } = tasksAdapter.getSelectors<RootState>(
  (state) => state.tasks
);
export const { reducer } = tasksSlice;
export const { setQueryConfig } = tasksSlice.actions;
export const selectAllTasks = createSelector(
  [
    tasksAdapter.getSelectors<RootState>((state) => state.tasks).selectAll,
    (state: RootState) => state.tasks.queryConfig,
  ],
  (tasks, queryConfig) =>
    tasks.filter(
      (task) => queryConfig?.completed === undefined || queryConfig.completed === task.completed
    )
);
