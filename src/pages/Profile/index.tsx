import { useSearchParams } from "react-router";
import Layout from "../../components/Layout";
import ProfileHeader from "./components/ProfileHeader";
import MyThreadCard from "./components/MyThreadCard";
import ReplyHistory from "./components/ReplyHistory";

export default function ProfilePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "forum";

    const handleTabChange = (tabName: string) => {
        setSearchParams({ tab: tabName });
    };

    return (
        <Layout>
            {/* header */}
            <ProfileHeader />

            {/* menu */}
            <section className="flex items-center justify-around mt-4">
                <button
                    onClick={() => handleTabChange("forum")}
                    className={`w-full border-b-2 pb-2 cursor-pointer ${tab === "forum" ? "border-white" : "text-white/40 border-secondary"}`}>
                    Forum
                </button>
                <button
                    onClick={() => handleTabChange("balasan")}
                    className={`w-full border-b-2 pb-2 cursor-pointer ${tab === "balasan" ? "border-white" : "text-white/40 border-secondary"}`}>
                    Balasan
                </button>
            </section>

            {tab === "forum" && (
                <>
                    <MyThreadCard />
                    <MyThreadCard />
                    <MyThreadCard />
                    <MyThreadCard />
                    <MyThreadCard />
                </>
            )}

            {tab === "balasan" && (
                <ReplyHistory />
            )}
        </Layout>
    );
}