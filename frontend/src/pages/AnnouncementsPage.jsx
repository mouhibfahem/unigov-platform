import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Megaphone, Calendar, User, Plus, Search, Trash2 } from 'lucide-react';

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await api.get('/announcements');
            setAnnouncements(response.data);
        } catch (err) {
            console.error('Failed to fetch', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/announcements', formData);
            setShowForm(false);
            setFormData({ title: '', content: '' });
            fetchAnnouncements();
        } catch (err) {
            alert('Failed to post announcement');
        }
    };

    return (
        <DashboardLayout title="Annonces Officielles">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Rechercher des annonces..." className="input pl-10 bg-white" />
                    </div>
                    {user.role !== 'ROLE_STUDENT' && (
                        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                            <Plus size={18} />
                            <span>Publier</span>
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 mx-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-800">Nouvelle Annonce</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <input
                                className="input"
                                placeholder="Titre de l'annonce"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="input min-h-[150px]"
                                placeholder="Que voulez-vous annoncer ?..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                            ></textarea>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Annuler</button>
                                <button type="submit" className="btn-primary px-8">Publier</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-6">
                    {loading ? (
                        <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div></div>
                    ) : announcements.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">Aucune annonce pour le moment.</div>
                    ) : (
                        announcements.map((a) => (
                            <div key={a.id} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group transition-all hover:shadow-md">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5 text-primary-600">
                                            <Megaphone size={14} />
                                            Officiel
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} />
                                            {new Date(a.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {user.role !== 'ROLE_STUDENT' && (
                                        <button className="text-slate-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">{a.title}</h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{a.content}</p>
                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                                        {a.delegateName.charAt(0)}
                                    </div>
                                    <span className="text-sm font-bold text-slate-500 tracking-tight">Publié par {a.delegateName}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AnnouncementsPage;
