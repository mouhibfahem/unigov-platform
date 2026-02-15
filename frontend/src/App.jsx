import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ComplaintsPage from './pages/ComplaintsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import PollsPage from './pages/PollsPage';
import RegulationsPage from './pages/RegulationsPage';
import MessagingPage from './pages/MessagingPage';
import './styles/index.css';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Navigate to="/complaints" replace />
                        </ProtectedRoute>
                    } />
                    <Route path="/complaints" element={
                        <ProtectedRoute>
                            <ComplaintsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/announcements" element={
                        <ProtectedRoute>
                            <AnnouncementsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/polls" element={
                        <ProtectedRoute>
                            <PollsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/regulations" element={
                        <ProtectedRoute>
                            <RegulationsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/messaging" element={
                        <ProtectedRoute>
                            <MessagingPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/decisions" element={
                        <ProtectedRoute>
                            <div className="p-10 font-bold text-slate-400">Decision Tracking Module coming soon...</div>
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
