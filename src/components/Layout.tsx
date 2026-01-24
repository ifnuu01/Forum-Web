import { Plus } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { openModal } from "../features/createThread/createThreadSlice";
import CreateThreadModal from "./CreateThreadModal";

export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="min-h-screen bg-primary relative flex md:bg-white">
            <Sidebar />
            <Navbar />
            <main className='pt-16 pb-20 md:pb-0 w-full flex justify-center'>
                <section
                    className="bg-primary w-full max-w-150 md:rounded-t-[40px] py-4 h-[calc(100vh-64px)] relative overflow-y-auto no-scrollbar border-2 border-secondary"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <div className="text-white">
                        {children}
                    </div>
                </section>
            </main>
            <button
                onClick={() => dispatch(openModal())}
                aria-label="Create Thread"
                className='fixed hidden md:flex bottom-10 right-10 bg-primary p-5 rounded-2xl text-secondary shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-40'
            >
                <Plus size={32} strokeWidth={3} />
            </button>

            <CreateThreadModal />
        </div>
    );
}