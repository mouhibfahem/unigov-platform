import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Send, User, Search, MoreHorizontal, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MessagingPage = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');

    const contacts = [
        { id: 1, name: 'Admin Étudiant', role: 'Support', status: 'en ligne', lastMsg: 'J\'ai mis à jour le statut de votre réclamation.' },
        { id: 2, name: 'Déléguée Sarah', role: 'Délégué', status: 'hors ligne', lastMsg: 'La réunion est prévue à 14h.' },
        { id: 3, name: 'James Wilson', role: 'Étudiant', status: 'en ligne', lastMsg: 'Merci pour l\'annonce.' }
    ];

    const [activeContact, setActiveContact] = useState(contacts[0]);

    return (
        <DashboardLayout title="Messagerie Interne">
            <div className="h-[calc(100vh-160px)] flex gap-6">
                {/* Contact List */}
                <div className="w-80 bg-white rounded-3xl border border-slate-100 flex flex-col overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-50">
                        <h3 className="font-bold text-slate-800 text-lg mb-4">Messages</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Rechercher..." className="w-full bg-slate-50 text-xs py-2.5 pl-9 pr-4 rounded-xl border-none focus:ring-1 focus:ring-primary-500 outline-none" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {contacts.map((c) => (
                            <div
                                key={c.id}
                                onClick={() => setActiveContact(c)}
                                className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-4 ${activeContact.id === c.id ? 'bg-primary-50/30 border-primary-600' : 'border-transparent'}`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-bold">
                                        {c.name.charAt(0)}
                                    </div>
                                    {c.status === 'en ligne' && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="font-bold text-slate-800 text-sm truncate">{c.name}</span>
                                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">il y a 2m</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{c.lastMsg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 bg-white rounded-3xl border border-slate-100 flex flex-col overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
                                {activeContact.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 leading-none">{activeContact.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{activeContact.role} • {activeContact.status}</p>
                            </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><MoreHorizontal size={20} /></button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/30">
                        <div className="flex justify-center"><span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-slate-100">Aujourd'hui</span></div>

                        <div className="flex items-end gap-3 transition-all">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold text-[10px]">A</div>
                            <div className="max-w-md bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                                <p className="text-sm text-slate-700 leading-relaxed">Bonjour ! J'ai examiné votre réclamation concernant les horaires de la bibliothèque. Nous envisageons d'étendre l'accès le week-end. Avez-vous des suggestions spécifiques ?</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-2 text-right">10:45</p>
                            </div>
                        </div>

                        <div className="flex items-end justify-end gap-3">
                            <div className="max-w-md bg-primary-600 p-4 rounded-2xl rounded-br-none shadow-lg shadow-primary-200">
                                <p className="text-sm text-white leading-relaxed">C'est une excellente nouvelle ! Je pense qu'un accès 24h/24 et 7j/7 pendant la semaine des examens est la priorité absolue pour la plupart des étudiants en ce moment.</p>
                                <p className="text-[10px] font-bold text-primary-200 mt-2 text-right">10:48</p>
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-6 border-t border-slate-50 bg-white/50">
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                            <button className="p-2 text-slate-400 hover:text-primary-600"><Paperclip size={20} /></button>
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Écrivez votre message ici..."
                                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm font-medium"
                            />
                            <button className="p-2 text-slate-400 hover:text-primary-600"><Smile size={20} /></button>
                            <button className="h-10 w-10 btn-primary px-0 py-0 flex items-center justify-center rounded-xl shadow-md">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MessagingPage;
