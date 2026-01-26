import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { timeAgo } from "../../../utils/fomat";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { downVoteThread, upVoteThread } from "../../../features/votes/votesSlice";
import { selectUser } from "../../../features/user/userSlice";

export default function MyThreadCard({
    id,
    name,
    avatar,
    title,
    createdAt,
    body,
    upVotesBy,
    downVotesBy,
    totalComments
}: {
    id: string,
    name: string,
    avatar: string,
    title: string,
    createdAt: string,
    body: string,
    upVotesBy?: string[],
    downVotesBy?: string[],
    totalComments?: number
}) {

    const dispatch = useDispatch<AppDispatch>();
    const { ownUser } = useSelector(selectUser);
    const navigate = useNavigate();
    const handleUpVoteThread = async () => {
        await dispatch(upVoteThread(id)).unwrap();
    }

    const handleDownVoteThread = async () => {
        await dispatch(downVoteThread(id)).unwrap();
    }

    const isUpVoted = upVotesBy?.includes(ownUser?.id || '') || false;
    const isDownVoted = downVotesBy?.includes(ownUser?.id || '') || false;
    return (
        <div className="px-8 mt-4 border-b-2 border-secondary pb-4">
            <section className="flex items-center gap-4">
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={avatar} alt={name} />
                <h2>{name}</h2>
                <span className="text-white/40">{timeAgo(createdAt)}</span>
            </section>
            <div className="ml-12 flex flex-col">
                <Link to={`/detail-thread/${id}`} className="font-bold text-xl">{title}</Link>
                <p>{body}</p>
                <div className="flex items-center gap-4 mt-2 mb-1">
                    <button
                        onClick={handleUpVoteThread}
                        className={`${isUpVoted ? 'text-white' : 'text-white/40'} flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1`}><ThumbsUp /><span>{upVotesBy?.length || 0}</span></button>
                    <button
                        onClick={handleDownVoteThread}
                        className={`${isDownVoted ? 'text-white' : 'text-white/40'} flex cursor-pointer hover:scale-110 transition-all duration-200 hover:text-white items-center gap-1`}><ThumbsDown /><span>{downVotesBy?.length || 0}</span></button>
                    <button
                        onClick={() => navigate(`/detail-thread/${id}`)}
                        className="flex items-center gap-1 text-white/40 cursor-pointer hover:scale-110 transition-transform duration-200"><MessageSquare /><span>{totalComments || 0}</span></button>
                </div>
            </div>
        </div>
    )
}
