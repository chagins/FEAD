/* eslint-disable no-param-reassign */ // redux toolkit use immer lib

import {
  createSlice,
  createEntityAdapter,
  EntityState,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { atlasApi, TTask, BSON } from 'shared/api';
import { makeMessageError } from 'shared/lib';

export const fetchTasksQuery = createAsyncThunk<TTask[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await atlasApi.getTasksList();
      const collection: Array<TTask> = [];
      if (response) {
        collection.push(...response);
      }
      return collection;
    } catch (err) {
      return rejectWithValue(makeMessageError('Fetch tasks error', err));
    }
  }
);

export const fetchTaskByIdQuery = createAsyncThunk<TTask, number, { rejectValue: string }>(
  'tasks/fetchTaskById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await atlasApi.getTaskById({ id });
      if (!response) {
        throw new Error(`task with id ${id} not found`);
      }
      return response;
    } catch (err) {
      return rejectWithValue(makeMessageError('Fetch task error', err));
    }
  }
);

export const addTaskMutation = createAsyncThunk<
  TTask,
  Pick<TTask, 'title' | 'userId'>,
  { rejectValue: string }
>(
  'tasks/addTask',
  async ({ userId, title }: Pick<TTask, 'title' | 'userId'>, { rejectWithValue }) => {
    try {
      const response = await atlasApi.addTask({ title, userId });
      if (!response) {
        throw new Error(`task not created`);
      }
      const newTask = await atlasApi.getTaskByOid({
        _id: new BSON.ObjectID(response.insertedId.id),
      });
      if (!newTask) {
        throw new Error(`task not found after creation`);
      }
      return newTask;
    } catch (err) {
      return rejectWithValue(makeMessageError('Create task error', err));
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
    if (!response || response.modifiedCount === 0) {
      throw new Error(`Task status with id: ${id} has not changed`);
    }
    return {
      id,
    };
  } catch (err) {
    return rejectWithValue(makeMessageError('Toggle task error', err));
  }
});

const tasksAdapter = createEntityAdapter<TTask>({
  sortComparer: (a, b) => (b?.id || 0) - (a?.id || 0),
});

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
    setQueryConfig(state, action: PayloadAction<TQueryConfig>) {
      state.queryConfig = action.payload;
    },
    clearState(state) {
      state.status = 'idle';
      state.error = undefined;
      tasksAdapter.removeAll(state);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasksQuery.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTasksQuery.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        tasksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTasksQuery.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(fetchTaskByIdQuery.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTaskByIdQuery.fulfilled, (state, action) => {
        state.status = 'idle';
        tasksAdapter.addOne(state, action.payload);
      })
      .addCase(fetchTaskByIdQuery.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(toggleTaskMutation.fulfilled, (state, action) => {
        const { id } = action.payload;
        const toggledTask = state.entities[id];
        if (toggledTask) {
          toggledTask.completed = !toggledTask.completed;
        }
      })
      .addCase(addTaskMutation.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
      });
  },
});

export const { selectById: selectTaskById } = tasksAdapter.getSelectors<RootState>(
  (state) => state.tasks
);
export const { reducer } = tasksSlice;
export const { setQueryConfig, clearState } = tasksSlice.actions;
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
