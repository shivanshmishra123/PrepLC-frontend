import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to crack your dream job?</h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Join the community of developers striving to master their interviews.
                </p>
                <Link to="/auth" className="px-10 py-4 bg-white text-dark font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto w-fit">
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
};

export default CTA;
