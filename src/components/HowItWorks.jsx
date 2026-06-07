import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Trophy } from 'lucide-react';

const steps = [
    {
        icon: <UserPlus className="w-6 h-6" />,
        title: "Sign Up",
        description: "Create your free profile in seconds."
    },
    {
        icon: <Search className="w-6 h-6" />,
        title: "Filter & Practice",
        description: "Find the perfect problems using powerful filters."
    },
    {
        icon: <Trophy className="w-6 h-6" />,
        title: "Track & Conquer",
        description: "Monitor your progress and walk into your interview with confidence."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Works</span></h2>
                    <p className="text-gray-400">Your path to success in three simple steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-dark border-4 border-dark-card flex items-center justify-center mb-6 relative z-10 shadow-xl shadow-primary/5 group hover:border-primary/50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-sm font-bold text-gray-400">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 max-w-xs">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
