import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    MessageSquare,
    Megaphone,
    BarChart3,
    BookOpen,
    History,
    FileText,
    Settings,
    LogOut
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
        { name: 'Réclamations', icon: MessageSquare, path: '/complaints', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
        { name: 'Annonces', icon: Megaphone, path: '/announcements', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
        { name: 'Sondages', icon: BarChart3, path: '/polls', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
        { name: 'Messagerie', icon: FileText, path: '/messaging', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
        { name: 'Règlements', icon: BookOpen, path: '/regulations', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
        { name: 'Décisions', icon: History, path: '/decisions', roles: ['ROLE_STUDENT', 'ROLE_DELEGUE', 'ROLE_ADMIN'] },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

    return (
        <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <Logo />
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {filteredItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                ? 'bg-primary-50 text-primary-600 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100 mt-auto">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
