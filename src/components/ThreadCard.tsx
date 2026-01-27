import { ChevronRight, MessageSquare, SendHorizonal, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { timeAgo } from '../utils/fomat';
import React, { useEffect, useRef, useState } from 'react';
import type { AppDispatch } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnProfile, selectUser } from '../features/user/userSlice';
import { createComment, selectComments } from '../features/comments/commentsSlice';
import { toast } from 'react-hot-toast';
import { addCommentToDetailThread, optimisticVoteThread } from '../features/threads/threadsSlice';
import { downVoteThread, upVoteThread } from '../features/votes/votesSlice';

export default function ThreadCard({
  isDetail = false,
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner
}: {
  isDetail?: boolean,
  id: string,
  title: string,
  body: string,
  category: string,
  createdAt: string,
  avatar?: string,
  ownerId?: string,
  upVotesBy?: string[],
  downVotesBy?: string[],
  totalComments?: number,
  owner?: {
    id: string;
    name: string;
    avatar: string;
  },
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { ownUser, loading } = useSelector(selectUser);
  const { loading: commentLoading, error: commentError } = useSelector(selectComments);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchOwnProfile());
  }, [dispatch]);

  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleUpVoteThread = async () => {
    dispatch(optimisticVoteThread({ threadId: id, userId: ownUser?.id || '', type: upVotesBy?.includes(ownUser?.id || '') ? 'neutral' : 'up' }));
    await dispatch(upVoteThread(id)).unwrap();
  };

  const handleDownVoteThread = async () => {
    dispatch(optimisticVoteThread({ threadId: id, userId: ownUser?.id || '', type: downVotesBy?.includes(ownUser?.id || '') ? 'neutral' : 'down' }));
    await dispatch(downVoteThread(id)).unwrap();
  };

  const isUpVoted = upVotesBy?.includes(ownUser?.id || '') || false;
  const isDownVoted = downVotesBy?.includes(ownUser?.id || '') || false;

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(createComment({ threadId: id, payload: { content } })).unwrap();
      const newComment = {
        ...response.data.comment,
        owner: ownUser!,
      };
      dispatch(addCommentToDetailThread({ threadId: id, comment: newComment }));
      setContent('');
    } catch {
      toast.error('Gagal mengirim komentar');
    }
  };

  return (
    <section
      className="w-full border-b-2 border-secondary px-8 pt-3 pb-2"
    >
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="order-2 md:order-1">
          <div className="flex flex-col gap-2 md:items-center md:flex-row">
            {
              loading ? (
                <>
                  <div className="w-5 h-5 bg-secondary/30 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-secondary/30 rounded w-20 animate-pulse"></div>
                </>
              ) : (
                <>
                  <h1>Dibuat oleh
                    <img
                      className="w-5 h-5 rounded-full object-cover inline ml-1"
                      src={owner?.avatar} alt="" />
                    <strong className="pl-1">{owner?.name}</strong>
                  </h1>
                  <p className="text-white/50">{timeAgo(createdAt)}</p>
                </>
              )
            }
          </div>
          <div>
            <Link to={`/detail-thread/${id}`} className="text-xl font-bold">{title}</Link>
          </div>
        </div>
        <div className="px-4 w-fit rounded-full border-2 border-white order-1 mb-2">
          <span>{category.slice(0, 8)}</span>
        </div>
      </div>

      {/* body */}
      <div className="mt-2">
        <p dangerouslySetInnerHTML={{ __html: body }}>
        </p>
      </div>

      {/* footer */}
      <div className="flex items-center gap-4 mt-2 mb-1">
        <button
          onClick={handleUpVoteThread}
          className={`${isUpVoted ? 'text-white' : 'text-white/40'} flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1`}><ThumbsUp /><span>{upVotesBy ? upVotesBy.length : 0}</span></button>
        <button
          onClick={handleDownVoteThread}
          className={`${isDownVoted ? 'text-white' : 'text-white/40'} flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1`}><ThumbsDown /><span>{downVotesBy ? downVotesBy.length : 0}</span></button>
        <button
          {...(isDetail ? {} : { onClick: () => navigate(`/detail-thread/${id}`) })}
          className="flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1 text-white/40"><MessageSquare /><span>{totalComments ? totalComments : 0}</span></button>
      </div>

      {isDetail && (
        <form onSubmit={handleSubmitComment} className="flex justify-between items-end gap-4 mt-4">
          {/* profile */}
          <div className="w-full">
            <section className="flex items-center gap-2 mt-4 ">
              {loading ? (
                <div className="w-10 h-10 bg-secondary/30 rounded-full animate-pulse"></div>
              ) : (
                <>
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={ownUser?.avatar} alt="" />
                  <h2>{ownUser?.name}</h2>
                </>
              )}
              <ChevronRight />
              <span className="text-xs text-white/40">Komentar</span>
            </section>
            <textarea
              ref={textAreaRef}
              onInput={handleTextAreaResize}
              autoFocus
              className="w-full mt-4 p-3 rounded-xl bg-primary focus:outline-none "
              rows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis komentar kamu disini..."
            ></textarea>
            {commentError && (<div className="text-red-500 text-sm mt-1">{commentError}</div>)}
          </div>
          <button
            type="submit"
            disabled={commentLoading || content.trim() === ''}
            className="bg-white text-primary rounded-full p-2 cursor-pointer hover:scale-110 transition-all duration-200">
            <SendHorizonal className="rotate-270" />
          </button>
        </form>
      )}

    </section>
  );
}
