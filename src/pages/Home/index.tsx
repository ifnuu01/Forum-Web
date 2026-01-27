import ThreadCard from '../../components/ThreadCard';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { fetchThreads, selectThreads } from '../../features/threads/threadsSlice';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchAllUsers, selectUser } from '../../features/user/userSlice';
import HomeSkeleton from './components/HomeSkeleton';
import CategoryList from './components/CategoryList';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { threads, loading, error } = useSelector(selectThreads);
  const { users, loading: usersLoading, error: usersError } = useSelector(selectUser);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const categories = useMemo(() => {
    const categorySet = new Set(threads.map((thread) => thread.category));
    return Array.from(categorySet);
  }, [threads]);

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  if (loading && usersLoading) {
    return (
      <Layout>
        {Array.from({ length: 5 }).map((_, index) => (
          <HomeSkeleton key={index} />
        ))}
      </Layout>
    );
  }
  if (error && usersError) return <div>Error: {error}</div>;
  return (
    <Layout>
      <>
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />
        {filteredThreads.length > 0 ? filteredThreads.map((thread) => (
          <ThreadCard
            key={thread.id}
            id={thread.id}
            title={thread.title}
            body={thread.body}
            category={thread.category}
            createdAt={thread.createdAt}
            owner={users.find((user) => user.id === thread.ownerId)!}
            ownerId={thread.ownerId}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            totalComments={thread.totalComments}
          />
        )) : <div>No threads available.</div>}
      </>
    </Layout>
  );
}