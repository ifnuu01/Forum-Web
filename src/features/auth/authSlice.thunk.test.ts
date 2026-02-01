import { login, register } from './authSlice';
import * as api from '../../services/auth/request';
import type { LoginRequest, LoginResponse } from '../../services/auth/type';
import { vi, describe, it, expect, beforeAll } from 'vitest';

// Skenario pengujian thunk auth:
// - Login: sukses (fulfilled) dan gagal (rejected)
// - Register: sukses (fulfilled) dan gagal (rejected)

beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem(key: string) { return store[key] || null; },
      setItem(key: string, value: string) { store[key] = value; },
      removeItem(key: string) { delete store[key]; },
      clear() { store = {}; },
    };
  })();
  Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });
});

// Mock API module
vi.mock('../../services/auth/request');

describe('login thunk', () => {
  it('should dispatch fulfilled when login success', async () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();
    const payload: LoginRequest = { email: 'a@a.com', password: '123' };
    const response: LoginResponse = {
      status: 'success',
      message: 'ok',
      data: { token: 'abc' },
    };
    (api.login as ReturnType<typeof vi.fn>).mockResolvedValue(response);

    const thunk = login(payload);
    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(api.login).toHaveBeenCalledWith(payload);
    expect(result.type).toBe('auth/login/fulfilled');
    expect(result.payload).toEqual(response);
  });

  it('should dispatch rejected when login failed', async () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();
    const payload: LoginRequest = { email: 'a@a.com', password: 'wrong' };
    const failResponse = {
      status: 'fail',
      message: 'Invalid credentials',
    };
    (api.login as ReturnType<typeof vi.fn>).mockResolvedValue(failResponse);

    const thunk = login(payload);
    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(result.type).toBe('auth/login/rejected');
    expect(result.payload).toBe('Invalid credentials');
  });
});

describe('register thunk', () => {
  it('should dispatch fulfilled when register success', async () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();
    const payload = { name: 'test', email: 'a@a.com', password: '123' };
    const response = {
      status: 'success',
      message: 'ok',
      data: { user: { id: '1', name: 'test', email: 'a@a.com', avatar: '' } }
    };
    (api.register as ReturnType<typeof vi.fn>).mockResolvedValue(response);

    const thunk = register(payload);
    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(api.register).toHaveBeenCalledWith(payload);
    expect(result.type).toBe('auth/register/fulfilled');
    expect(result.payload).toEqual(response);
  });

  it('should dispatch rejected when register failed', async () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();
    const payload = { name: 'test', email: 'a@a.com', password: '123' };
    const failResponse = {
      status: 'fail',
      message: 'Email already exists',
    };
    (api.register as ReturnType<typeof vi.fn>).mockResolvedValue(failResponse);

    const thunk = register(payload);
    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(result.type).toBe('auth/register/rejected');
    expect(result.payload).toBe('Email already exists');
  });
});