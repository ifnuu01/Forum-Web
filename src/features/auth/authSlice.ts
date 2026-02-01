import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import * as authService from '../../services/auth/request';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  AuthState,
} from '../../services/auth/type';

const initialState: AuthState = {
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
    if (response.status === 'fail') {
      return rejectWithValue(response.message);
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
    if (response.status === 'fail') {
      return rejectWithValue(response.message);
    }
    if (response.status === 'success' && response.data?.token) {
      localStorage.setItem(
        'auth',
        JSON.stringify({ token: response.data.token })
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
      state.token = null;
      localStorage.removeItem('auth');
    },
    loadAuthFromStorage(state) {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const parsed = JSON.parse(raw);
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
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
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