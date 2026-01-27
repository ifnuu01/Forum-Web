import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import threadsReducer from '../features/threads/threadsSlice'
import commentsReducer from '../features/comments/commentsSlice'
import leaderboardReducer from '../features/leaderboard/leaderboardSlice'
import votesReducer from '../features/votes/votesSlice'
import userReducer from '../features/user/userSlice'
import replyHistoryReducer from '../features/replyHistory/replyHistorySlice'
import createThreadReducer from '../features/createThread/createThreadSlice'
import ModalAuthReducer from '../features/auth/modalAuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    comments: commentsReducer,
    leaderboard: leaderboardReducer,
    votes: votesReducer,
    user: userReducer,
    replyHistory: replyHistoryReducer,
    createThread: createThreadReducer,
    modalAuth: ModalAuthReducer,
  },
})

// Types untuk hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;