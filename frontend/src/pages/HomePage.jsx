import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import {
    Megaphone,
    BarChart2,
    Gavel,
    Scale,
    MessageSquare,
    ArrowRight,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';

const HomePage = () => {
    const quickActions = [
        {
            title: 'Réclamations',
            action: 'Soumettre',
            desc: 'Faites entendre votre voix',
            icon: AlertTriangle,
            color: 'bg-indigo-500/20 text-indigo-400',
            path: '/complaints'
        },
        {
            title: 'Annonces',
            action: 'Consulter',
            desc: 'Restez informé',
            icon: Megaphone,
            color: 'bg-blue-500/20 text-blue-400',
            path: '/announcements'
        },
        {
            title: 'Sondages',
            action: 'Participer',
            desc: 'Donnez votre avis',
            icon: BarChart2,
            color: 'bg-emerald-500/20 text-emerald-400',
            path: '/polls'
        },
        {
            title: 'Règlement',
            action: 'Explorer',
            desc: 'Connaissez vos droits',
            icon: Gavel,
            color: 'bg-orange-500/20 text-orange-400',
            path: '/regulations'
        }
    ];

    return (
        <DashboardLayout title="Accueil">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-[2rem] text-white shadow-2xl shadow-primary-500/20" style={{ minHeight: '420px' }}>
                    {/* Background Image — clearly visible */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
                    />
                    {/* Light overlay — photo stays visible */}
                    <div className="absolute inset-0 bg-primary-900/30" />
                    {/* Bottom gradient only — text area */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-900/90 via-primary-900/60 to-transparent" />
                    {/* Content — positioned at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-10 z-10">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Bienvenue sur UniGov !</h1>
                            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md">
                                Plateforme digitale de communication et de gouvernance étudiante. Exprimez vos réclamations, consultez les annonces, participez aux sondages et bien plus.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className="group card !p-6 flex items-center gap-5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border-slate-100 dark:border-slate-800/50"
                        >
                            <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} shadow-lg transition-transform group-hover:rotate-6`}>
                                <item.icon size={26} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-0.5">{item.title}</p>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">{item.action}</h3>
                                <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium truncate">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Main CTA */}
                <div className="flex justify-center pt-6">
                    <Link to="/complaints">
                        <button className="group btn-primary !py-4 px-10 flex items-center gap-3 text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 transition-all rounded-2xl">
                            <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="font-bold">Continuer vers mon espace</span>
                        </button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HomePage;
