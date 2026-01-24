import { ChevronRight, MessageSquare, SendHorizonal, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

export default function ThreadCard({ isDetail = false }: { isDetail?: boolean }) {
    return (
        <section
            className="w-full border-b-2 border-secondary px-8 pt-3 pb-2"
        >
            {/* header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="order-2 md:order-1">
                    <div className="flex flex-col gap-2 md:items-center md:flex-row">
                        <h1>Dibuat oleh
                            {isDetail && (
                                <img
                                    className="w-5 h-5 rounded-full object-cover inline ml-1"
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            )}
                            <strong className="pl-1">Dimas</strong>
                        </h1>
                        <p className="text-white/50">1 hari yang lalu</p>
                    </div>
                    <div>
                        <Link to="/detail-thread" className="text-xl font-bold">Lorem ipsum dolar sit amet</Link>
                    </div>
                </div>
                <div className="px-4 w-fit rounded-full border-2 border-white order-1 mb-2">
                    <span>Curhatan</span>
                </div>
            </div>

            {/* body */}
            <div className="mt-2">
                <p>Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, qui....</p>
            </div>

            {/* footer */}
            <div className="flex items-center gap-4 mt-2 mb-1">
                <button className="flex items-center gap-1 text-white/40"><ThumbsUp /><span>10</span></button>
                <button className="flex items-center gap-1 text-white/40"><ThumbsDown /><span>0</span></button>
                <button className="flex items-center gap-1 text-white/40"><MessageSquare /><span>0</span></button>
            </div>

            {isDetail && (
                <form action="" className="flex justify-between items-center gap-4 mt-4">
                    {/* profile */}
                    <div className="w-full">
                        <section className="flex items-center gap-2 mt-4 ">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <h2>Ifnu Umar</h2>
                            <ChevronRight />
                            <span className="text-xs text-white/40">Komentar</span>
                        </section>
                        <textarea
                            className="w-full mt-4 p-3 rounded-xl bg-primary focus:outline-none "
                            rows={1}
                            placeholder="Tulis komentar kamu disini..."
                        ></textarea>
                    </div>
                    <button className="bg-white text-primary rounded-full p-2 cursor-pointer hover:scale-110 transition-all duration-200">
                        <SendHorizonal />
                    </button>
                </form>
            )}

        </section>
    )
}
