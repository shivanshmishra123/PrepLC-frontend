import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight"
                >
                    Land Your Dream <br />
                    Tech Job, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400">Faster.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Practice real, company-specific interview questions from top tech giants.
                    Level up with our futuristic prep tools.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/practice" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                        Get Started for Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

                {/* Visual / Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 relative mx-auto max-w-4xl"
                >
                    <div className="relative rounded-xl border border-white/10 bg-dark-card/50 backdrop-blur-xl p-4 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl pointer-events-none" />

                        {/* Mock UI Header */}
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="flex-1 text-center text-xs text-gray-500 font-mono">preplc-dashboard.tsx</div>
                        </div>

                        {/* Mock UI Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            <div className="col-span-1 space-y-3">
                                <div className="h-8 w-3/4 bg-white/5 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                                <div className="h-32 w-full bg-white/5 rounded mt-4 border border-white/5" />
                            </div>
                            <div className="col-span-2 space-y-3">
                                <div className="flex gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs">Google</span>
                                    <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs">Amazon</span>
                                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Meta</span>
                                </div>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <Code2 className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                                                <span className="text-sm text-gray-300">Two Sum</span>
                                            </div>
                                            <span className="text-xs text-green-400">Easy</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
