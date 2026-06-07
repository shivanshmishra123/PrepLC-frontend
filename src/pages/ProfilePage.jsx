import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Code, Save, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const ProfilePage = () => {
    const { user, token, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [leetcodeId, setLeetcodeId] = useState(user?.leetcodeId || '');
    const [isEditing, setIsEditing] = useState(!user?.leetcodeId);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSaveLeetcodeId = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile/leetcode`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ leetcodeId })
            });

            if (response.ok) {
                const data = await response.json();
                updateUser({
                    ...user,
                    leetcodeId: data.leetcodeId
                });
                setMessage('LeetCode ID updated successfully!');
                setIsEditing(false);
            } else {
                setMessage('Failed to update LeetCode ID');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: 'linear-gradient(to bottom, #1F0C2F, #0A0A0A)' }}>
            {/* Header */}
            <header className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-white">
                    PrepLC
                </div>
                <Link to="/practice" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Practice
                </Link>
            </header>

            <main className="p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-white/60">Manage your account and LeetCode integration</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm mb-6">
                    <div className="p-6 space-y-6">
                        {/* User Info */}
                        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-3xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{user?.name}</h2>
                                <p className="text-white/60">{user?.email}</p>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4">Account Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 font-medium flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </label>
                                    <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white/80">
                                        {user?.name}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 font-medium flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white/80">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LeetCode Integration */}
                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5" />
                                LeetCode Integration
                            </h3>

                            {message && (
                                <div className={`p-3 rounded-lg text-sm ${message.includes('success')
                                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                    }`}>
                                    {message}
                                </div>
                            )}

                            {!user?.leetcodeId && !isEditing ? (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                    <p className="text-yellow-400 mb-3">
                                        You haven't linked your LeetCode profile yet. Link it to see your statistics!
                                    </p>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-all"
                                    >
                                        Link LeetCode Profile
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 font-medium">LeetCode Username</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={leetcodeId}
                                                onChange={(e) => setLeetcodeId(e.target.value)}
                                                disabled={!isEditing}
                                                placeholder="Enter your LeetCode username"
                                                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
                                            />
                                            {isEditing ? (
                                                <button
                                                    onClick={handleSaveLeetcodeId}
                                                    disabled={loading || !leetcodeId}
                                                    className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    {loading ? 'Saving...' : 'Save'}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            )}
                        </div>

                        {/* Logout Button */}
                        <div className="pt-6 border-t border-white/10">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium py-3 px-6 rounded-lg transition-all flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
