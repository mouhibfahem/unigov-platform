import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
    Users, MessageSquare, AlertTriangle, CheckCircle2,
    TrendingUp, Activity, PieChart as PieIcon
} from 'lucide-react';

const AdminDashboard = () => {
    // Mock data for the charts
    const participationData = [
        { name: 'Lun', votes: 45 },
        { name: 'Mar', votes: 52 },
        { name: 'Mer', votes: 38 },
        { name: 'Jeu', votes: 65 },
        { name: 'Ven', votes: 48 },
        { name: 'Sam', votes: 20 },
        { name: 'Dim', votes: 15 },
    ];

    const stats = [
        { label: 'Total Étudiants', value: '1,280', icon: Users, color: 'bg-blue-500/20 text-blue-500' },
        { label: 'Réclamations Actives', value: '24', icon: AlertTriangle, color: 'bg-orange-500/20 text-orange-500' },
        { label: 'Sondages en cours', value: '8', icon: Activity, icon: Activity, color: 'bg-emerald-500/20 text-emerald-500' },
        { label: 'Messages du jour', value: '156', icon: MessageSquare, color: 'bg-purple-500/20 text-purple-500' },
    ];

    return (
        <DashboardLayout title="Administration & Analytics">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="card p-6 flex items-center gap-5 hover:scale-[1.02] transition-transform">
                            <div className={`p-4 rounded-2xl ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Votes Participation */}
                    <div className="card p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <TrendingUp className="text-primary-500" /> Participation aux Sondages
                            </h3>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={participationData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="votes" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Claims Status */}
                    <div className="card p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <PieIcon className="text-orange-500" /> État des Réclamations
                            </h3>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={participationData}>
                                    <defs>
                                        <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="votes" stroke="#f59e0b" fillOpacity={1} fill="url(#colorVotes)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* Recent Activity or detailed log could go here */}

            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
