import { ChevronRight } from "lucide-react";
import Layout from "../../components/Layout";
import ThreadCard from "../../components/ThreadCard";
import CommentCard from "../../components/CommentCard";

export default function DetailThreadPage() {
    return (
        <Layout>
            <ThreadCard isDetail={true} />
            <h1 className="text-white text-xl font-bold px-8 mt-2">Komentar <ChevronRight className="inline rotate-90" /></h1>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
        </Layout>
    )
}
