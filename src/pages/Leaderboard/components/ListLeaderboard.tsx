import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchLeaderboard, selectLeaderboard } from "../../../features/leaderboard/leaderboardSlice";
import type { AppDispatch } from "../../../store/store";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

export default function ListLeaderboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { leaderboard, loading, error } = useSelector(selectLeaderboard)

    useEffect(() => {
        dispatch(fetchLeaderboard());
    }, [dispatch]);

    if (loading) {
        return <LeaderboardSkeleton />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <table className="w-full mt-4 border-separate border-spacing-y-2">
            <thead>
                <th className="w-10 md:w-20">No</th>
                <th className="text-left">Nama Pengguna</th>
                <th>Skor</th>
            </thead>
            <tbody>
                {leaderboard.length > 0 ? leaderboard.map((item, index) => (
                    <tr key={item.user.id}>
                        <td className="text-center py-2">{index + 1}</td>
                        <td className="flex items-center gap-2">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={item.user.avatar} alt={item.user.name} />
                            <span className="ml-2">{item.user.name}</span>
                        </td>
                        <td className="text-center">{item.score}</td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={3} className="text-center py-4">
                            No leaderboard data available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}