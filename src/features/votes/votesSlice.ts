import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as voteService from '../../services/votes/request'
import type {
  UpVoteThreadResponse,
  DownVoteThreadResponse,
  NeutralVoteThreadResponse,
  UpVoteCommentResponse,
  DownVoteCommentResponse,
  NeutralVoteCommentResponse,
} from '../../services/votes/type'
import type { RootState } from '../../store/store'

interface VotesState {
  loading: boolean;
  error: string | null;
}

const initialState: VotesState = {
  loading: false,
  error: null,
}

// Async thunk: up vote thread
export const upVoteThread = createAsyncThunk<
  UpVoteThreadResponse,
  string,
  { rejectValue: string }
>('votes/upVoteThread', async (threadId, { rejectWithValue }) => {
  try {
    const response = await voteService.upVoteThread(threadId)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to up vote thread'
    return rejectWithValue(message)
  }
})

// Async thunk: down vote thread
export const downVoteThread = createAsyncThunk<
  DownVoteThreadResponse,
  string,
  { rejectValue: string }
>('votes/downVoteThread', async (threadId, { rejectWithValue }) => {
  try {
    const response = await voteService.downVoteThread(threadId)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to down vote thread'
    return rejectWithValue(message)
  }
})

// Async thunk: neutral vote thread
export const neutralVoteThread = createAsyncThunk<
  NeutralVoteThreadResponse,
  string,
  { rejectValue: string }
>('votes/neutralVoteThread', async (threadId, { rejectWithValue }) => {
  try {
    const response = await voteService.neutralVoteThread(threadId)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to neutral vote thread'
    return rejectWithValue(message)
  }
})

// Async thunk: up vote comment
export const upVoteComment = createAsyncThunk<
  UpVoteCommentResponse,
  { threadId: string; commentId: string },
  { rejectValue: string }
>('votes/upVoteComment', async ({ threadId, commentId }, { rejectWithValue }) => {
  try {
    const response = await voteService.upVoteComment(threadId, commentId)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to up vote comment'
    return rejectWithValue(message)
  }
})

// Async thunk: down vote comment
export const downVoteComment = createAsyncThunk<
  DownVoteCommentResponse,
  { threadId: string; commentId: string },
  { rejectValue: string }
>('votes/downVoteComment', async ({ threadId, commentId }, { rejectWithValue }) => {
  try {
    const response = await voteService.downVoteComment(threadId, commentId)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to down vote comment'
    return rejectWithValue(message)
  }
})

// Async thunk: neutral vote comment
export const neutralVoteComment = createAsyncThunk<
  NeutralVoteCommentResponse,
  { threadId: string; commentId: string },
  { rejectValue: string }
>('votes/neutralVoteComment', async ({ threadId, commentId }, { rejectWithValue }) => {
  try {
    const response = await voteService.neutralVoteComment(threadId, commentId)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to neutral vote comment'
    return rejectWithValue(message)
  }
})

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // upVoteThread
      .addCase(upVoteThread.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(upVoteThread.fulfilled, (state) => {
        state.loading = false
        // Update votes di threadsSlice akan dilakukan di komponen atau dengan listener
      })
      .addCase(upVoteThread.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to up vote thread'
      })
      // downVoteThread
      .addCase(downVoteThread.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(downVoteThread.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(downVoteThread.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to down vote thread'
      })
      // neutralVoteThread
      .addCase(neutralVoteThread.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(neutralVoteThread.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(neutralVoteThread.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to neutral vote thread'
      })
      // upVoteComment
      .addCase(upVoteComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(upVoteComment.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(upVoteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to up vote comment'
      })
      // downVoteComment
      .addCase(downVoteComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(downVoteComment.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(downVoteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to down vote comment'
      })
      // neutralVoteComment
      .addCase(neutralVoteComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(neutralVoteComment.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(neutralVoteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to neutral vote comment'
      })
  },
})

export default votesSlice.reducer

// Selector
export const selectVotes = (state: RootState) => state.votes