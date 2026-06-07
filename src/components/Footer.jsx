import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/5 bg-white/5 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PrepLC. All rights reserved.</p>
            <>Build With ❤️ for Dreamers, by Shivansh Mishra</>
        </footer>
    );
};

export default Footer;
