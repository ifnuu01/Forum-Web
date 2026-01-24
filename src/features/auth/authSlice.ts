import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import * as authService from '../../services/auth/request';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from '../../services/auth/type';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Register thunk
export const register = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.register(payload);
    if (response.status === 'success' && response.data?.user) {
      localStorage.setItem(
        'auth',
        JSON.stringify({ user: response.data.user, token: null })
      );
    }
    return response;
  } catch (err: unknown) {
    const  message = err instanceof Error ? err.message : 'Register failed';
    return rejectWithValue(message);
  }
});

// Login thunk
export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.login(payload);
    if (response.status === 'success' && response.data?.token) {
      // Ambil user dari localStorage jika ada
      const raw = localStorage.getItem('auth');
      const user = raw ? JSON.parse(raw).user : null;
      localStorage.setItem(
        'auth',
        JSON.stringify({ user, token: response.data.token })
      );
    }
    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('auth');
    },
    loadAuthFromStorage(state) {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        state.user = parsed.user || null;
        state.token = parsed.token || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 'success' && action.payload.data?.user) {
          state.user = action.payload.data.user;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Register failed';
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 'success' && action.payload.data?.token) {
          state.token = action.payload.data.token;
          // user tetap dari localStorage
          const raw = localStorage.getItem('auth');
          state.user = raw ? JSON.parse(raw).user : null;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout, loadAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;

// Selector
export const selectAuth = (state: RootState) => state.auth;