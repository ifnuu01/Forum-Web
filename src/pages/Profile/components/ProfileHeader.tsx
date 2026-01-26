import { useDispatch, useSelector } from "react-redux"
import { fetchOwnProfile, selectUser } from "../../../features/user/userSlice";
import { useEffect } from "react";
import type { AppDispatch } from "../../../store/store";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

export default function ProfileHeader() {
    const dispatch = useDispatch<AppDispatch>();
    const { ownUser, loading, error } = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchOwnProfile());
    }, [dispatch]);

    if (loading) {
        return <ProfileHeaderSkeleton />
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="flex items-center justify-between px-8 py-4">
            <div>
                <h1 className="text-xl font-bold">{ownUser?.name}</h1>
                <p className="text-white/40">{ownUser?.email}</p>
            </div>
            <img
                className="w-20 h-20 rounded-full object-cover"
                src={ownUser?.avatar} alt="avatar" />
        </section>
    )
}
