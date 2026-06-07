import React from 'react';
import { motion } from 'framer-motion';
import { Filter, BarChart2, BookOpen } from 'lucide-react';

const features = [
    {
        icon: <Filter className="w-6 h-6 text-primary" />,
        title: "Company-Specific Questions",
        description: "Filter from over 100+ companies to practice the exact questions you'll be asked."
    },
    {
        icon: <BarChart2 className="w-6 h-6 text-pink-400" />,
        title: "Personalized Tracking",
        description: "Mark favorites, track your progress, and identify your weak spots with our analytics dashboard."
    },
    {
        icon: <BookOpen className="w-6 h-6 text-blue-400" />,
        title: "Custom Notebooks",
        description: "Create organized notebooks for different topics or companies to keep your solutions and notes in one place."
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-primary">excel</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Stop grinding random problems. Focus on what matters with our curated tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-dark-card flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
