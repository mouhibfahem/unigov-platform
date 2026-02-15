import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ title }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>

            <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="bg-slate-50 border-transparent focus:bg-white focus:border-primary-100 pl-10 pr-4 py-2 rounded-xl text-sm w-64 transition-all outline-none"
                    />
                </div>

                <button className="relative p-2 text-slate-400 hover:text-primary-600 transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800 leading-none">{user?.fullName}</p>
                        <p className="text-[10px] font-bold text-primary-500 uppercase tracking-wider mt-1">
                            {user?.role.replace('ROLE_', '')}
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center font-bold relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                        <User size={20} />
                        <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
