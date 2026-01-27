export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
  ownerName?: string;
}

export const DUMMY_THREADS: Thread[] = [
  {
    id: 'thread-1',
    title: 'Lorem ipsum dolar sit amet',
    body: 'Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet...',
    category: 'Curhatan',
    createdAt: '2026-01-22T07:00:00.000Z',
    ownerId: 'user-1',
    ownerName: 'Dimas',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 1,
  },
  {
    id: 'thread-2',
    title: 'Lorem ipsum dolar sit amet',
    body: 'Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet...',
    category: 'Curhatan',
    createdAt: '2026-01-22T07:00:00.000Z',
    ownerId: 'user-1',
    ownerName: 'Dimas',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 1,
  },
  {
    id: 'thread-3',
    title: 'Lorem ipsum dolar sit amet',
    body: 'Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet...',
    category: 'Curhatan',
    createdAt: '2026-01-22T07:00:00.000Z',
    ownerId: 'user-1',
    ownerName: 'Dimas',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 1,
  },
]