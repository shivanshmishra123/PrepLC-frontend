import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">P</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">PrepLC</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
                    <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">How It Works</a>
                </div>

                <Link to="/practice" className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary/25">
                    Get Started
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
