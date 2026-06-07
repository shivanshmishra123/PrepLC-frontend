import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { signup, login, isAuthenticated } = useAuth();

    useEffect(() => {
        // Redirect if already authenticated
        if (isAuthenticated) {
            navigate('/practice');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    navigate('/practice');
                } else {
                    setError(result.error || 'Invalid email or password');
                }
            } else {
                // Signup
                if (!formData.name || !formData.email || !formData.password) {
                    setError('All fields are required');
                    setLoading(false);
                    return;
                }
                const result = await signup(formData.name, formData.email, formData.password);
                if (result.success) {
                    navigate('/practice');
                } else {
                    setError(result.error || 'Signup failed');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (loginMode) => {
        setIsLogin(loginMode);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isLogin ? 'Enter your credentials to access your account' : 'Join us and start your journey today'}
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="flex p-1 bg-black/20 rounded-xl mb-8 relative">
                    <motion.div
                        className="absolute top-1 bottom-1 bg-primary rounded-lg shadow-lg"
                        initial={false}
                        animate={{
                            left: isLogin ? '4px' : '50%',
                            width: 'calc(50% - 4px)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => handleToggle(true)}
                        className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${isLogin ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => handleToggle(false)}
                        className={`flex-1 py-2.5 text-sm font-medium relative z-10 transition-colors ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Sign Up
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-5 overflow-hidden"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 font-medium ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 font-medium ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300 font-medium ml-1">
                            {isLogin ? 'Password' : 'Create Password'}
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-primary hover:text-primary-light transition-colors">
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AuthPage;
