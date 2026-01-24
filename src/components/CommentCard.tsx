import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function CommentCard() {
    return (
        <div className="px-8 border-b-2 border-secondary py-2">
            {/* Header */}
            <section className="flex items-center gap-2 ">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h2>Ifnu Umar</h2>
                <span className="text-white/40">12 hari lalu</span>
            </section>
            {/* Body */}
            <div className="mt-2 ml-12 flex flex-col">
                <p>Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, qui....</p>
                <div className="flex items-center gap-4 mt-2 mb-1">
                    <button className="flex items-center gap-1 text-white/40"><ThumbsUp /><span>10</span></button>
                    <button className="flex items-center gap-1 text-white/40"><ThumbsDown /><span>0</span></button>
                </div>
            </div>
        </div>
    )
}
