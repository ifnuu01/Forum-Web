import threadsReducer, {
  clearDetailThread,
  optimisticVoteThread,
} from './threadsSlice';
import {
  fetchThreads,
} from './threadsSlice';
import type { ThreadsState } from '../../services/threads/type';
import { describe, it, expect } from 'vitest';

// Skenario pengujian threadsSlice reducer:
// - clearDetailThread menghapus detail thread
// - optimisticVoteThread menambah/menghapus vote
// - fetchThreads pending, fulfilled, rejected mengubah state sesuai action

const mockDetailThread = {
  id: '1',
  title: '',
  body: '',
  category: '',
  createdAt: '',
  owner: { id: '', name: '', avatar: '' },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

describe('threadsSlice reducer', () => {
  const initialState: ThreadsState = {
    threads: [],
    detailThread: null,
    loading: false,
    error: null,
  };

  it('should handle clearDetailThread', () => {
    const stateWithDetail: ThreadsState = {
      ...initialState,
      detailThread: mockDetailThread,
    };
    const state = threadsReducer(stateWithDetail, clearDetailThread());
    expect(state.detailThread).toBeNull();
  });

  it('should handle optimisticVoteThread (up)', () => {
    const stateWithThreads: ThreadsState = {
      ...initialState,
      threads: [
        {
          id: '1',
          title: '',
          body: '',
          category: '',
          createdAt: '',
          ownerId: '',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };
    const state = threadsReducer(
      stateWithThreads,
      optimisticVoteThread({ threadId: '1', userId: 'u1', type: 'up' })
    );
    expect(state.threads[0].upVotesBy).toContain('u1');
    expect(state.threads[0].downVotesBy).not.toContain('u1');
  });

  it('should handle fetchThreads.pending', () => {
    const state = threadsReducer(initialState, { type: fetchThreads.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchThreads.fulfilled', () => {
    const threads = [
      {
        id: '1',
        title: 't',
        body: '',
        category: '',
        createdAt: '',
        ownerId: '',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: fetchThreads.fulfilled.type,
      payload: { status: 'success', message: '', data: { threads } },
    };
    const state = threadsReducer(initialState, action);
    expect(state.threads).toEqual(threads);
    expect(state.loading).toBe(false);
  });

  it('should handle fetchThreads.rejected', () => {
    const action = {
      type: fetchThreads.rejected.type,
      payload: 'Failed to fetch threads',
    };
    const state = threadsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch threads');
  });
});