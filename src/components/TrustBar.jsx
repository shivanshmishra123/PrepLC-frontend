import React from 'react';
import { motion } from 'framer-motion';

const companies = [
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', className: 'brightness-0 invert' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', className: 'brightness-0 invert' },
    { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png', className: 'brightness-0 invert' },
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg', className: 'brightness-0 invert' },
];

const TrustBar = () => {
    return (
        <section className="py-14 border-y border-white/5 bg-black/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <p className="text-center text-xl md:text-2xl text-gray-300 font-semibold">
                    Practice Questions from leading companies like
                </p>
            </div>

            <div className="flex overflow-hidden relative">
                {/* Gradient masks for smooth fade out at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-20 items-center flex-nowrap min-w-full"
                    initial={{ x: "-50%" }}
                    animate={{ x: "0%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {/* Quadruple the list to ensure seamless looping on all screen sizes */}
                    {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
                        <div key={index} className="flex-shrink-0 flex items-center justify-center h-12 w-32 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                            <img
                                src={company.logo}
                                alt={company.name}
                                className={`h-full w-full object-contain ${company.className || ''}`}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="text-center mt-12">
                <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">And Many More......</p>
            </div>
        </section>
    );
};

export default TrustBar;
