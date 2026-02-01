import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import * as threadService from '../../services/threads/request';
import type {
  ThreadRequest,
  ThreadResponse,
  GetAllThreadsResponse,
  DetailThreadResponse,
  ThreadsState,
} from '../../services/threads/type';
import type { RootState } from '../../store/store';

const initialState: ThreadsState = {
  threads: [],
  detailThread: null,
  loading: false,
  error: null,
};

// Async thunk: get all threads
export const fetchThreads = createAsyncThunk<
  GetAllThreadsResponse,
  void,
  { rejectValue: string }
>('threads/fetchThreads', async (_, { rejectWithValue }) => {
  try {
    const response = await threadService.getAllThreads();
    if (response.status === 'success') {
      return response;
    }
    return rejectWithValue(response.message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch threads';
    return rejectWithValue(message);
  }
});

// Async thunk: get detail thread
export const fetchDetailThread = createAsyncThunk<
  DetailThreadResponse,
  string,
  { rejectValue: string }
>('threads/fetchDetailThread', async (id, { rejectWithValue }) => {
  try {
    const response = await threadService.getDetailThread(id);
    if (response.status === 'success') {
      return response;
    }
    return rejectWithValue(response.message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch threads';
    return rejectWithValue(message);
  }
});

// Async thunk: create thread
export const createThread = createAsyncThunk<
  ThreadResponse,
  ThreadRequest,
  { rejectValue: string }
>('threads/createThread', async (payload, { rejectWithValue }) => {
  try {
    const response = await threadService.createThread(payload);
    if (response.status === 'success') {
      return response;
    }
    return rejectWithValue(response.message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch threads';
    return rejectWithValue(message);
  }
});

const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    clearDetailThread(state) {
      state.detailThread = null;
    },
    addCommentToDetailThread(state, action: PayloadAction<{ threadId: string; comment: DetailThreadResponse['data']['detailThread']['comments'][0] }>) {
      if (state.detailThread && state.detailThread.id === action.payload.threadId) {
        state.detailThread.comments.unshift(action.payload.comment);
      }
    },
    optimisticVoteThread(state, action: PayloadAction<{ threadId: string; userId: string; type: 'up' | 'down' | 'neutral' }>) {
      const { threadId, userId, type }  = action.payload;
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        if (type === 'up') {
          if (!thread.upVotesBy.includes(userId)) {
            thread.upVotesBy.push(userId);
            thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
          }
        } else if (type === 'down') {
          if (!thread.downVotesBy.includes(userId)) {
            thread.downVotesBy.push(userId);
            thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          }
        } else if (type === 'neutral') {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      }
      if (state.detailThread && state.detailThread.id === threadId) {
        if (type === 'up') {
          if (!state.detailThread.upVotesBy.includes(userId)) {
            state.detailThread.upVotesBy.push(userId);
            state.detailThread.downVotesBy = state.detailThread.downVotesBy.filter((id) => id !== userId);
          }
        } else if (type === 'down') {
          if (!state.detailThread.downVotesBy.includes(userId)) {
            state.detailThread.downVotesBy.push(userId);
            state.detailThread.upVotesBy = state.detailThread.upVotesBy.filter((id) => id !== userId);
          }
        } else if (type === 'neutral') {
          state.detailThread.upVotesBy = state.detailThread.upVotesBy.filter((id) => id !== userId);
          state.detailThread.downVotesBy = state.detailThread.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    optimisticVoteComment(
      state,
      action: PayloadAction<{
        threadId: string;
        commentId: string;
        userId: string;
        type: 'up' | 'down' | 'neutral';
      }>
    ) {
      if (
        state.detailThread &&
        state.detailThread.id === action.payload.threadId
      ) {
        const comment = state.detailThread.comments.find(
          (c) => c.id === action.payload.commentId
        );
        if (comment) {
          if (action.payload.type === 'up') {
            if (!comment.upVotesBy.includes(action.payload.userId)) {
              comment.upVotesBy.push(action.payload.userId);
              comment.downVotesBy = comment.downVotesBy.filter(
                (id) => id !== action.payload.userId
              );
            }
          } else if (action.payload.type === 'down') {
            if (!comment.downVotesBy.includes(action.payload.userId)) {
              comment.downVotesBy.push(action.payload.userId);
              comment.upVotesBy = comment.upVotesBy.filter(
                (id) => id !== action.payload.userId
              );
            }
          } else if (action.payload.type === 'neutral') {
            comment.upVotesBy = comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            );
            comment.downVotesBy = comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            );
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchThreads
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload.data.threads;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch threads';
      })
      // fetchDetailThread
      .addCase(fetchDetailThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailThread.fulfilled, (state, action) => {
        state.loading = false;
        state.detailThread = action.payload.data.detailThread;
      })
      .addCase(fetchDetailThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch thread detail';
      })
      // createThread
      .addCase(createThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.loading = false;
        // Tambahkan thread baru ke list jika ada
        if (action.payload.data?.thread) {
          state.threads.unshift(action.payload.data.thread);
        }
      })
      .addCase(createThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create thread';
      });
  },
});

export const { clearDetailThread, addCommentToDetailThread, optimisticVoteThread, optimisticVoteComment } = threadSlice.actions;
export default threadSlice.reducer;

// Selector
export const selectThreads = (state: RootState) => state.threads;