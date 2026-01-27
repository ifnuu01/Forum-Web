import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as commentService from '../../services/comments/request'
import type { CommentRequest, CommentResponse } from '../../services/comments/type'
import type { RootState } from '../../store/store'

interface CommentsState {
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  loading: false,
  error: null,
}

// Async thunk: create comment
export const createComment = createAsyncThunk<
  CommentResponse,
  { threadId: string; payload: CommentRequest },
  { rejectValue: string }
>('comments/createComment', async ({ threadId, payload }, { rejectWithValue }) => {
  try {
    const response = await commentService.createComment(threadId, payload)
    if (response.status === 'success') {
      return response
    }
    return rejectWithValue(response.message)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create comment'
    return rejectWithValue(message)
  }
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createComment.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create comment'
      })
  },
})

export default commentsSlice.reducer

// Selector
export const selectComments = (state: RootState) => state.comments