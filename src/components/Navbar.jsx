import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import '../index.css';

const Navbar = ({ onOpenAuth }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 0',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'white',
        boxShadow: scrolled ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid #F1F3F4',
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 'var(--spacing-container)',
        padding: '0 1.5rem',
    };

    const logoStyle = {
        fontSize: '1.4rem',
        fontWeight: '500',
        color: 'var(--color-text-main)',
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    const logoPartStyle = (color) => ({
        color: color,
    });

    const linkContainerStyle = {
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center',
    };

    const linkStyle = {
        color: 'var(--color-text-muted)',
        fontWeight: '500',
        fontSize: '1rem',
        transition: 'color 0.2s',
    };

    return (
        <nav style={navbarStyle}>
            <div style={containerStyle}>
                <a href="#" style={logoStyle}>
                    <Logo />
                </a>

                <div style={linkContainerStyle}>
                    <div style={{ display: 'flex', gap: '2rem', marginRight: '1rem' }} className="nav-links">
                        <a href="#features" style={linkStyle}>Features</a>
                        <a href="#about" style={linkStyle}>About</a>
                        <a href="#pricing" style={linkStyle}>Pricing</a>
                        <a href="#contact" style={linkStyle}>Contact</a>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className="btn"
                            style={{ color: 'var(--color-google-blue)', padding: '0.5rem 1.5rem' }}
                            onClick={() => onOpenAuth('signin')}
                        >
                            Sign In
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{ padding: '0.5rem 1.5rem' }}
                            onClick={() => onOpenAuth('signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
