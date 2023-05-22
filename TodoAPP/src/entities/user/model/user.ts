/* eslint-disable no-param-reassign */ // redux toolkit use immer lib
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { atlasApi, TUser } from 'shared/api';
import { makeMessageError } from 'shared/lib';

export const signUpUserByEmailPassword = createAsyncThunk<
  void,
  atlasApi.TRegisterUserEmailPasswordParams,
  { rejectValue: string }
>('user/signIn', async (params: atlasApi.TRegisterUserEmailPasswordParams, { rejectWithValue }) => {
  try {
    return await atlasApi.signUpByEmailPassword(params);
  } catch (err) {
    return rejectWithValue(makeMessageError('Register user error', err));
  }
});

export const signInUserByEmailPassword = createAsyncThunk<
  TUser,
  atlasApi.TRegisterUserEmailPasswordParams,
  { rejectValue: string }
>('user/signUp', async (params: atlasApi.TRegisterUserEmailPasswordParams, { rejectWithValue }) => {
  try {
    const response = await atlasApi.signInByEmailPassword(params);
    if (!response) {
      throw new Error(`Sign In failed`);
    }
    return response;
  } catch (err) {
    return rejectWithValue(makeMessageError('Sign In failed', err));
  }
});

export const signOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await atlasApi.signOut();
      return response;
    } catch (err) {
      return rejectWithValue(makeMessageError('Sign Out failed', err));
    }
  }
);

type TUserSlice = {
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TUserSlice = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state) {
      state.user = atlasApi.getCurrentUser();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signInUserByEmailPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUserByEmailPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signInUserByEmailPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.error(action.payload);
      })
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.error(action.payload);
      })
      .addCase(signUpUserByEmailPassword.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(signUpUserByEmailPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signUpUserByEmailPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.error(action.payload);
      });
  },
});

export const { reducer } = userSlice;

export const { getUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => ({
  isLoading: state.user.isLoading,
});
