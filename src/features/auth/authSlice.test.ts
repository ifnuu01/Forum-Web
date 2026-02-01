import authReducer, { logout } from './authSlice';
import { login, register } from './authSlice';
import type { AuthState } from '../../services/auth/type';
import { describe, it, expect } from 'vitest';

// Skenario pengujian authSlice reducer:
// - Logout menghapus token dan reset state
// - Unknown action tidak mengubah state
// - login/register pending, fulfilled, rejected mengubah state sesuai action

describe('authSlice reducer', () => {
  it('should handle logout', () => {
    const initialState: AuthState = { token: 'sometoken', loading: false, error: null };
    const action = logout();
    const state = authReducer(initialState, action);
    expect(state.token).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle unknown action', () => {
    const initialState: AuthState = { token: 'sometoken', loading: false, error: null };
    const action = { type: 'unknown' };
    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle login.pending', () => {
    const initialState: AuthState = { token: null, loading: false, error: 'Some error' };
    const action = { type: login.pending.type };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle login.fulfilled', () => {
    const initialState: AuthState = { token: null, loading: true, error: null };
    const action = {
      type: login.fulfilled.type,
      payload: { status: 'success', data: { token: 'newtoken' } }
    };
    const state = authReducer(initialState, action);
    expect(state.token).toBe('newtoken');
    expect(state.loading).toBe(false);
  });

  it('should handle login.rejected', () => {
    const initialState: AuthState = { token: null, loading: true, error: null };
    const action = {
      type: login.rejected.type,
      payload: 'Login failed'
    };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  it('should handle register.pending', () => {
    const initialState: AuthState = { token: null, loading: false, error: 'Some error' };
    const action = { type: register.pending.type };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle register.fulfilled', () => {
    const initialState: AuthState = { token: null, loading: true, error: null };
    const action = {
      type: register.fulfilled.type,
      payload: { status: 'success', message: 'ok' }
    };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle register.rejected', () => {
    const initialState: AuthState = { token: null, loading: true, error: null };
    const action = {
      type: register.rejected.type,
      payload: 'Register failed'
    };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Register failed');
  });
});