import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/user/request';
import type { GetAllUsersResponse, OwnProfileResponse } from '../../services/user/type';
import type { RootState } from '../../store/store';

interface UserState {
  users: GetAllUsersResponse['data']['users'];
  ownUser: OwnProfileResponse['data']['user'] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  ownUser: null,
  loading: false,
  error: null,
};

// Async thunk: fetch all users
export const fetchAllUsers = createAsyncThunk<
  GetAllUsersResponse,
  void,
  { rejectValue: string }
>('user/fetchAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getAllUsers();
    if (response.status === 'success') {
      return response;
    }
    return rejectWithValue(response.message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch all users';
    return rejectWithValue(message);
  }
});

// Async thunk: fetch own profile
export const fetchOwnProfile = createAsyncThunk<
  OwnProfileResponse,
  void,
  { rejectValue: string }
>('user/fetchOwnProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getOwnProfile();
    if (response.status === 'success') {
      return response;
    }
    return rejectWithValue(response.message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch own profile';
    return rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch all users';
      })
      // fetchOwnProfile
      .addCase(fetchOwnProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.ownUser = action.payload.data.user;
      })
      .addCase(fetchOwnProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch own profile';
      });
  },
});

export default userSlice.reducer;

// Selector
export const selectUser = (state: RootState) => state.user;