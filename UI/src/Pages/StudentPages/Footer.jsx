import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                {/* Left side */}
                <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>

            </div>
        </footer>
    );
}

export default Footer;
