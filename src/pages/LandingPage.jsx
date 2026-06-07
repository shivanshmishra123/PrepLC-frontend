import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <TrustBar />
                <Features />
                <HowItWorks />
                <CTA />
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;
