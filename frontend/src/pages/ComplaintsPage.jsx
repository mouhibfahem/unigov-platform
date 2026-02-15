import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
    Plus,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    MessageSquare,
    AlertTriangle
} from 'lucide-react';

const ComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Exams',
        description: '',
        priority: 'MEDIUM'
    });
    const { user } = useAuth();

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const endpoint = user.role === 'ROLE_STUDENT' ? '/complaints/my' : '/complaints';
            const response = await api.get(endpoint);
            setComplaints(response.data);
        } catch (err) {
            console.error('Failed to fetch complaints', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/complaints', formData);
            setShowForm(false);
            setFormData({ title: '', category: 'Exams', description: '', priority: 'MEDIUM' });
            fetchComplaints();
        } catch (err) {
            alert('Failed to submit complaint');
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'URGENT': return 'bg-red-100 text-red-600';
            case 'HIGH': return 'bg-orange-100 text-orange-600';
            case 'MEDIUM': return 'bg-blue-100 text-blue-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const getStatusIcon = (s) => {
        switch (s) {
            case 'RESOLVED': return <CheckCircle2 className="text-green-500" size={18} />;
            case 'IN_PROGRESS': return <Clock className="text-orange-500" size={18} />;
            default: return <AlertCircle className="text-slate-400" size={18} />;
        }
    };

    return (
        <DashboardLayout title="Gestion des Réclamations">
            <div className="flex flex-col gap-6">
                {/* Actions Bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 max-w-lg">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Rechercher une réclamation..." className="input pl-10 bg-white" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                            <Filter size={18} />
                            <span>Filtrer</span>
                        </button>
                    </div>

                    {user.role === 'ROLE_STUDENT' && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Nouvelle Réclamation</span>
                        </button>
                    )}
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-800">Soumettre une Réclamation</h3>
                                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Objet / Titre</label>
                                    <input
                                        className="input"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Décrivez brièvement le problème"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Catégorie</label>
                                        <select
                                            className="input"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Exams">Examens</option>
                                            <option value="Absences">Absences</option>
                                            <option value="Infrastructure">Infrastructure</option>
                                            <option value="Discipline">Discipline</option>
                                            <option value="Others">Autres</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Niveau de Priorité</label>
                                        <select
                                            className="input"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        >
                                            <option value="LOW">Basse</option>
                                            <option value="MEDIUM">Moyenne</option>
                                            <option value="HIGH">Haute</option>
                                            <option value="URGENT">Urgente</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Description Détaillée</label>
                                    <textarea
                                        className="input min-h-[120px]"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Fournissez autant de détails que possible..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Annuler</button>
                                    <button type="submit" className="btn-primary px-8">Soumettre</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="grid grid-cols-1 gap-4">
                    {loading ? (
                        <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div></div>
                    ) : complaints.length === 0 ? (
                        <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare size={32} />
                            </div>
                            <p className="text-slate-400 font-medium">Aucune réclamation trouvée pour le moment.</p>
                        </div>
                    ) : (
                        complaints.map((c) => (
                            <div key={c.id} className="card group hover:border-primary-100 transition-all cursor-pointer">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${getPriorityColor(c.priority)}`}>
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-slate-800">{c.title}</h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getPriorityColor(c.priority)}`}>
                                                    {c.priority}
                                                </span>
                                            </div>
                                            <p className="text-slate-500 text-sm line-clamp-1 mb-2">{c.description}</p>
                                            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                                    {getStatusIcon(c.status)}
                                                    {c.status.replace('_', ' ')}
                                                </span>
                                                <span>•</span>
                                                <span>{c.category}</span>
                                                <span>•</span>
                                                <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                                                {user.role !== 'ROLE_STUDENT' && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-primary-600 font-bold">Par {c.studentName}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ComplaintsPage;
