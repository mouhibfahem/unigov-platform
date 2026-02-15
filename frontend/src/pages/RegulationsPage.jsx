import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Book, Search, ExternalLink, ShieldCheck, Scale, Landmark } from 'lucide-react';

const RegulationsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const regulations = [
        {
            category: 'examens',
            title: 'Protocole des Examens 2024',
            content: 'Règles officielles concernant la présence, les pièces d\'identité requises et le matériel interdit lors des examens finaux.',
            icon: Scale,
            updated: '20 Jan 2024'
        },
        {
            category: 'absences',
            title: 'Politique d\'Assiduité',
            content: 'Nombre maximum d\'absences non justifiées autorisées et procédure de soumission des certificats médicaux.',
            icon: ShieldCheck,
            updated: '15 Dec 2023'
        },
        {
            category: 'discipline',
            title: 'Code de Conduite Étudiant',
            content: 'Directives sur l\'intégrité académique, le comportement sur le campus et les procédures disciplinaires.',
            icon: Landmark,
            updated: '05 Fév 2024'
        },
        {
            category: 'stages',
            title: 'Règlement des Stages',
            content: 'Critères d\'approbation des stages, exigences de durée et fiches d\'évaluation.',
            icon: Book,
            updated: '10 Jan 2024'
        },
        {
            category: 'Examens & Notes',
            title: 'Règlement des Notes et de l’Admission – ENICarthage',
            content: 'Règlement officiel définissant les modalités d’évaluation, le calcul des moyennes, les conditions d’admission, le rattrapage, les crédits et l’obtention du diplôme.',
            summary: 'Version simplifiée : Moyenne >= 10/20 pour réussir. Note éliminatoire < 6/20. Rattrapage si moyenne entre 8 et 10. Crédits validés si module acquis.',
            icon: Scale,
            updated: 'Sept 2021',
            pdfName: 'Guide de l’élève ingénieur – ENICarthage (2021)',
            pdfPath: '/documents/Guide_Eleve_Ingenieur_2021.pdf'
        }
    ];

    const filtered = regulations.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.summary && r.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout title="Règlements Intérieurs">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-primary-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-xl shadow-primary-200">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h1 className="text-3xl font-bold mb-3">Directives Académiques</h1>
                            <p className="text-primary-100 font-medium">Consultez les règlements officiels de l'université, les politiques et les documents relatifs aux droits des étudiants.</p>
                        </div>
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher des articles ou des lois..."
                                className="w-full bg-primary-700/50 border border-primary-500 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((r, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-primary-100 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                    <r.icon size={24} />
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full group-hover:bg-primary-50 group-hover:text-primary-500">
                                    {r.category}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{r.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">{r.content}</p>

                            {r.summary && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                    <p className="text-xs font-bold text-yellow-700 mb-1 flex items-center gap-1">
                                        ✨ Version simplifiée
                                    </p>
                                    <p className="text-xs text-slate-600 italic leading-relaxed">
                                        "{r.summary}"
                                    </p>
                                </div>
                            )}

                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                                <span className="text-xs font-semibold text-slate-400">Mis à jour: {r.updated}</span>
                                {r.pdfPath ? (
                                    <a
                                        href={r.pdfPath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-primary-600 font-bold text-sm hover:underline"
                                    >
                                        Télécharger PDF
                                        <ExternalLink size={14} />
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm cursor-not-allowed">
                                        Non disponible
                                        <ExternalLink size={14} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RegulationsPage;
