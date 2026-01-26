import {
    Home,
    Plus,
    BarChart2,
    Ellipsis,
    User,
    LogOut,
    UserRound
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import type { AppDispatch } from '../store/store';
import { openModal } from '../features/createThread/createThreadSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Sidebar() {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [elipseMenuOpen, setElipseMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const clickedInsideDesktop = desktopMenuRef.current?.contains(target);
            const clickedInsideMobile = mobileMenuRef.current?.contains(target);

            if (!clickedInsideDesktop && !clickedInsideMobile) {
                setElipseMenuOpen(false);
            }
        }

        if (elipseMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [elipseMenuOpen]);

    const activeClass = (path: string) =>
        location.pathname === path ? 'text-white md:text-primary' : 'text-primary md:text-secondary';

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside className='hidden md:flex w-20 h-[95vh] fixed left-5 top-1/2 -translate-y-1/2 flex-col justify-between items-center py-12'>
                <div className='text-3xl font-bold text-primary'>T</div>

                <nav className='flex flex-col gap-8 items-center'>
                    <Link to="/" title="Home">
                        <button className={`${activeClass('/')} hover:scale-110 transition-all cursor-pointer`}>
                            <Home size={28} />
                        </button>
                    </Link>

                    <button
                        onClick={() => dispatch(openModal())}
                        title="New Thread"
                        className='bg-primary p-3 rounded-2xl text-secondary cursor-pointer hover:scale-110 transition-all shadow-lg'
                    >
                        <Plus size={24} strokeWidth={3} />
                    </button>

                    <Link to="/papan-peringkat" title="Leaderboard">
                        <button className={`${activeClass('/papan-peringkat')} hover:scale-110 transition-all cursor-pointer`}>
                            <BarChart2 size={28} />
                        </button>
                    </Link>
                </nav>

                <div className="relative">
                    <button
                        onClick={() => setElipseMenuOpen(!elipseMenuOpen)}
                        className='text-secondary hover:text-primary transition-all cursor-pointer'
                    >
                        <Ellipsis size={28} />
                    </button>

                    {/* Desktop Pop-up Menu */}
                    {elipseMenuOpen && (
                        <div ref={desktopMenuRef} className='absolute text-white bottom-0 left-16 bg-primary border border-secondary/20 shadow-2xl rounded-2xl p-2 w-48 animate-in slide-in-from-left-2 duration-200'>
                            <Link to="/profile" className="flex cursor-pointer items-center gap-3 w-full p-3 hover:bg-secondary/10 rounded-xl text-sm transition-colors"><User size={18} /> Profile</Link>
                            <hr className="my-2 border border-secondary" />
                            <button
                                onClick={() => dispatch(logout())}
                                className="flex cursor-pointer items-center gap-3 w-full p-3 text-red-500 hover:bg-red-500/10 rounded-xl text-sm transition-colors"><LogOut size={18} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside >

            {/* MOBILE BOTTOM NAV */}
            < nav className='md:hidden fixed -bottom-1 left-0 right-0 bg-secondary h-16 flex justify-around items-center px-6 z-40' >
                <Link to="/" className={`${activeClass('/')} hover:scale-110 transition-all cursor-pointer`}>
                    <Home size={26} />
                </Link>

                <button
                    onClick={() => dispatch(openModal())}
                    className='bg-primary p-4 rounded-xl text-white -translate-y-8 shadow-xl border border-secondary cursor-pointer hover:scale-110 transition-all duration-200'
                >
                    <Plus size={24} strokeWidth={3} />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setElipseMenuOpen(!elipseMenuOpen)}
                        className={`${elipseMenuOpen ? 'text-white' : 'text-primary'} hover:scale-110 transition-all cursor-pointer`}
                    >
                        <Ellipsis size={26} />
                    </button>

                    {/* Mobile Pop-up Menu */}
                    {elipseMenuOpen && (
                        <div ref={mobileMenuRef} className='absolute bottom-20 -right-24 bg-primary text-white border border-secondary/20 shadow-2xl rounded-2xl p-2 w-48 animate-in slide-in-from-bottom-2 duration-200'>
                            <Link to="/papan-peringkat" className="flex items-center gap-3 w-full p-3 hover:bg-secondary/10 rounded-xl text-sm transition-colors"><BarChart2 size={18} /> Leaderboard</Link>
                            <Link to="/profile" className="flex cursor-pointer items-center gap-3 w-full p-3 hover:bg-secondary/10 rounded-xl text-sm transition-colors"><UserRound size={18} /> Profile</Link>
                            <button
                                onClick={() => dispatch(logout())}
                                className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-500/10 rounded-xl text-sm transition-colors"><LogOut size={18} /> Logout</button>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}