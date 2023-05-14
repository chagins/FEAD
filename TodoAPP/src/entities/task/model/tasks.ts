/* eslint-disable no-param-reassign */
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

export const toggleTaskMutation = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string; state: RootState }
>('tasks/toggleTask', async (id: number, { rejectWithValue, getState }) => {
  try {
    const toggledTask = getState().tasks.entities[id];
    if (!toggledTask) {
      throw new Error(`Task with id: ${id} not found`);
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

const tasksAdapter = createEntityAdapter<TTask>();

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
      tasksAdapter.upsertMany(state, action.payload);
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
      });
  },
});

export const { reducer } = tasksSlice;
const { selectAll } = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const { setQueryConfig } = tasksSlice.actions;
export const selectAllTasks = createSelector(
  [selectAll, (state: RootState) => state.tasks.queryConfig],
  (tasks, queryConfig) =>
    tasks.filter(
      (task) => queryConfig?.completed === undefined || queryConfig.completed === task.completed
    )
);
