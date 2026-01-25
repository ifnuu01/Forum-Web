import ThreadCard from '../../components/ThreadCard';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { fetchThreads, selectThreads } from '../../features/threads/threadsSlice';
import { useEffect } from 'react';
import { fetchAllUsers, selectUser } from '../../features/user/userSlice';
import HomeSkeleton from './components/HomeSkeleton';

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { threads, loading, error } = useSelector(selectThreads);
    const { users, loading: usersLoading, error: usersError } = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchThreads());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (loading && usersLoading) {
        return (
            <Layout>
                {Array.from({ length: 5 }).map((_, index) => (
                    <HomeSkeleton key={index} />
                ))}
            </Layout>
        )
    }
    if (error && usersError) return <div>Error: {error}</div>;
    return (
        <Layout>
            {threads.length > 0 ? threads.map((thread) => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    title={thread.title}
                    body={thread.body}
                    category={thread.category}
                    createdAt={thread.createdAt}
                    owner={users.find(user => user.id === thread.ownerId)!}
                    ownerId={thread.ownerId}
                    upVotesBy={thread.upVotesBy}
                    downVotesBy={thread.downVotesBy}
                    totalComments={thread.totalComments}
                />
            )) : <div>No threads available.</div>}
        </Layout>
    );
}