import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as leaderboardService from '../../services/leaderboard/request';
import type { LeaderboardResponse } from '../../services/leaderboard/type';
import type { RootState } from '../../store/store';

interface LeaderboardState {
  leaderboard: LeaderboardResponse['data']['leaderboard'];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  leaderboard: [],
  loading: false,
  error: null,
};

// Async thunk: fetch leaderboard
export const fetchLeaderboard = createAsyncThunk<
  LeaderboardResponse,
  void,
  { rejectValue: string }
>('leaderboard/fetchLeaderboard', async (_, { rejectWithValue }) => {
  try {
    const response = await leaderboardService.getLeaderboard();
    if (response.status === 'success') {
      return response;
    }
    return rejectWithValue(response.message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch leaderboard';
    return rejectWithValue(message);
  }
});

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.data.leaderboard;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leaderboard';
      });
  },
});

export default leaderboardSlice.reducer;

// Selector
export const selectLeaderboard = (state: RootState) => state.leaderboard;