import { ThumbsDown, ThumbsUp } from "lucide-react";
import { timeAgo } from "../utils/fomat";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import { selectUser } from "../features/user/userSlice";
import { downVoteComment, upVoteComment } from "../features/votes/votesSlice";

export default function CommentCard({
    id,
    threadId,
    content,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy
}: {
    id: string,
    threadId: string,
    content: string,
    createdAt: string,
    owner: {
        id: string;
        name: string;
        avatar: string;
    },
    upVotesBy?: string[],
    downVotesBy?: string[],
}) {
    const dispatch = useDispatch<AppDispatch>();
    const { ownUser } = useSelector(selectUser);

    const handleUpVoteComment = async () => {
        await dispatch(upVoteComment({ threadId, commentId: id })).unwrap();
    }

    const handleDownVoteComment = async () => {
        await dispatch(downVoteComment({ threadId, commentId: id })).unwrap();
    }

    const isUpVoted = upVotesBy?.includes(ownUser?.id || '') || false;
    const isDownVoted = downVotesBy?.includes(ownUser?.id || '') || false;

    return (
        <div className="px-8 border-b-2 border-secondary py-2">
            {/* Header */}
            <section className="flex items-center gap-2 ">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={owner.avatar} alt={owner.name} />
                <h2>{owner.name}</h2>
                <span className="text-white/40">{timeAgo(createdAt)}</span>
            </section>
            {/* Body */}
            <div className="mt-2 ml-12 flex flex-col">
                <p
                    dangerouslySetInnerHTML={{ __html: content }}
                ></p>
                <div className="flex items-center gap-4 mt-2 mb-1">
                    <button
                        onClick={handleUpVoteComment}
                        className={`${isUpVoted ? 'text-white' : 'text-white/40'} flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1`}><ThumbsUp /><span>{upVotesBy?.length || 0}</span></button>
                    <button
                        onClick={handleDownVoteComment}
                        className={`${isDownVoted ? 'text-white' : 'text-white/40'} flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1`}
                    ><ThumbsDown /><span>{downVotesBy?.length || 0}</span></button>
                </div>
            </div>
        </div>
    )
}
