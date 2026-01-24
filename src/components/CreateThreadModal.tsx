import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { closeModal, updateForm } from '../features/createThread/createThreadSlice';
import { createThread } from '../features/threads/threadsSlice';
import { Hash, SendHorizontal, MessageCircleDashed } from 'lucide-react';

export default function CreateThreadModal() {
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen, form, isSubmitting, error } = useSelector((state: RootState) => state.createThread);
    const { authUser } = useSelector((state: RootState) => state.authUser || { authUser: null });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createThread(form));
    };

    return (
        <div className="fixed inset-0 bg-[#121212]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-primary rounded-4xl w-full max-w-xl text-white border border-secondary shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header ala Threads */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-secondary/50">
                    <button
                        onClick={() => dispatch(closeModal())}
                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        Batal
                    </button>
                    <h2 className="font-bold text-lg">Forum Baru</h2>
                    <div className="w-10"></div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex gap-4">
                        {/* Avatar User */}
                        <div className="flex flex-col items-center gap-2">
                            <img
                                src={authUser?.avatar || 'https://ui-avatars.com/api/?name=User'}
                                alt="me"
                                className="w-12 h-12 rounded-full border border-secondary"
                            />
                            <div className="w-0.5 flex-1 bg-secondary rounded-full my-1"></div>
                        </div>

                        {/* Input Area */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    placeholder="Judul diskusi..."
                                    value={form.title}
                                    onChange={(e) => dispatch(updateForm({ title: e.target.value }))}
                                    className="w-full bg-transparent text-xl font-bold placeholder:text-white/40 outline-none"
                                    required
                                />
                                <textarea
                                    placeholder="Apa yang baru?"
                                    value={form.body}
                                    onChange={(e) => dispatch(updateForm({ body: e.target.value }))}
                                    className="w-full bg-transparent text-md placeholder:text-white/60 outline-none resize-none min-h-30"
                                    required
                                />
                            </div>

                            {/* Category as Badge Input */}
                            <div className="flex items-center gap-2 text-white focus-within:text-white transition-colors">
                                <Hash size={18} />
                                <input
                                    type="text"
                                    placeholder="Tambah kategori..."
                                    value={form.category}
                                    onChange={(e) => dispatch(updateForm({ category: e.target.value }))}
                                    className="bg-transparent text-sm outline-none w-full placeholder:text-white/60"
                                    required
                                />
                            </div>
                            {/* Action Icons ala Socmed */}
                            <div className="flex gap-2 pt-2 text-secondary items-center">
                                <MessageCircleDashed size={20} className="cursor-not-allowed opacity-30" />
                                <p>Temukan solusi diforum ini</p>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs mt-4 ml-16">{error}</p>}

                    {/* Bottom Action */}
                    <div className="flex justify-end items-center mt-6 pt-4 border-t border-secondary/50">
                        <button
                            type="submit"
                            // disabled={isSubmitting || !form.title || !form.body}
                            className="flex items-center gap-2 px-8 py-2.5 bg-white text-primary font-bold rounded-full hover:opacity-90 active:scale-95 disabled:opacity-30 transition-all cursor-pointer"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Posting</span>
                                    <SendHorizontal size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}