import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Tipe data yang disimpan
export interface ReplyHistoryItem {
  thread: {
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    ownerId: string;
  };
  comment: {
    content: string;
    createdAt: string;
  };
}

interface ReplyHistoryState {
  replies: ReplyHistoryItem[];
}

const STORAGE_KEY = 'replyHistory'

const loadFromStorage = (): ReplyHistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.log('Failed to load reply history from storage', err)
  }
  return []
}

const initialState: ReplyHistoryState = {
  replies: loadFromStorage(),
}

const replyHistorySlice = createSlice({
  name: 'replyHistory',
  initialState,
  reducers: {
    addReply(state, action: PayloadAction<ReplyHistoryItem>) {
      state.replies.unshift(action.payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.replies))
    },
    clearReplies(state) {
      state.replies = []
      localStorage.removeItem(STORAGE_KEY)
    },
    loadRepliesFromStorage(state) {
      state.replies = loadFromStorage()
    },
  },
})

export const { addReply, clearReplies, loadRepliesFromStorage } = replyHistorySlice.actions
export default replyHistorySlice.reducer

// Selector
export const selectReplyHistory = (state: RootState) => state.replyHistory.replies