import { ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';
import ThreadCard from '../../components/ThreadCard';
import CommentCard from '../../components/CommentCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { fetchDetailThread, selectThreads } from '../../features/threads/threadsSlice';
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import DetailThreadSkeleton from './components/DetailThreadSkeleton';
import { fetchAllUsers } from '../../features/user/userSlice';

export default function DetailThreadPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { detailThread, loading, error } = useSelector(selectThreads);

  useEffect(() => {
    dispatch(fetchDetailThread(id!));
    dispatch(fetchAllUsers());
  }, [dispatch, id]);

  if (loading) {
    return (
      <Layout>
        <DetailThreadSkeleton />
      </Layout>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      {
        detailThread && (
          <>
            <ThreadCard
              id={detailThread.id}
              title={detailThread.title}
              body={detailThread.body}
              category={detailThread.category}
              createdAt={detailThread.createdAt}
              owner={detailThread.owner}
              upVotesBy={detailThread.upVotesBy}
              downVotesBy={detailThread.downVotesBy}
              totalComments={detailThread.comments.length}
              isDetail={true} />
            <h1 className="text-white text-xl font-bold px-8 mt-2">Komentar <ChevronRight className="inline rotate-90" /></h1>

            {detailThread.comments.length > 0 ?
              detailThread.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  threadId={detailThread.id}
                  id={comment.id}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  owner={comment.owner}
                  upVotesBy={comment.upVotesBy}
                  downVotesBy={comment.downVotesBy} />
              )) : (
                <div className="w-full text-center py-4">
                  No comments available.
                </div>
              )}
          </>
        )
      }
    </Layout>
  );
}
