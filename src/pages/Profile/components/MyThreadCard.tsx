import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

export default function MyThreadCard() {
    return (
        <div className="px-8 mt-4 border-b-2 border-secondary pb-4">
            <section className="flex items-center gap-4">
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h2>Ifnu Umar</h2>
                <span className="text-white/40">12 hari lalu</span>
            </section>
            <div className="ml-12 flex flex-col">
                <Link to="/detail-thread" className="font-bold text-xl">Lorem ipsum dolor sit.</Link>
                <p>Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, qui....</p>
                <div className="flex items-center gap-4 mt-2 mb-1">
                    <button className="flex items-center gap-1 text-white/40 cursor-pointer hover:scale-110 transition-transform duration-200"><ThumbsUp /><span>10</span></button>
                    <button className="flex items-center gap-1 text-white/40 cursor-pointer hover:scale-110 transition-transform duration-200"><ThumbsDown /><span>0</span></button>
                    <button className="flex items-center gap-1 text-white/40 cursor-pointer hover:scale-110 transition-transform duration-200"><MessageSquare /><span>0</span></button>
                </div>
            </div>
        </div>
    )
}
