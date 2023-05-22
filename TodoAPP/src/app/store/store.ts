import { configureStore } from '@reduxjs/toolkit';
import { taskModel } from 'entities/task';
import { userModel } from 'entities/user';

export const store = configureStore({
  reducer: {
    tasks: taskModel.reducer,
    user: userModel.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
