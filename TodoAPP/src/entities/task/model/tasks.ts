/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  EntityState,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { TTask, atlasApi } from 'shared/api';

export const fetchTasks = createAsyncThunk<TTask[], void, { rejectValue: string }>(
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

export const toggleTask = createAsyncThunk<
  atlasApi.TApiUpdateTaskResponse & { id: number },
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
    return {
      ...response.data,
      id,
    };
  } catch (err) {
    let messageError = 'Update task error';
    if (err instanceof Error) {
      messageError = `${messageError}: ${err.message}`;
    }
    return rejectWithValue(messageError);
  }
});

const tasksAdapter = createEntityAdapter<TTask>();

type TTasksSlice = EntityState<TTask> & {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | undefined;
};

const initialState: TTasksSlice = tasksAdapter.getInitialState({
  status: 'idle',
  error: undefined,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask(state, action: PayloadAction<number>) {
      const toggledTask = state.entities[action.payload];
      if (toggledTask) {
        toggledTask.completed = !toggledTask.completed;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        tasksAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const { id, modifiedCount } = action.payload;
        const toggledTask = state.entities[id];
        if (toggledTask && modifiedCount > 0) {
          toggledTask.completed = !toggledTask.completed;
        }
      })
      .addCase(toggleTask.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { reducer } = tasksSlice;
export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors<RootState>((state) => state.tasks);
