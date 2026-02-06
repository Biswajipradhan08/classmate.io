import React from 'react';

const Hero = ({ onGetStarted }) => {
    const heroStyle = {
        padding: '10rem 0 6rem',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
    };

    /* Geometric Shapes for Google feel + Neon glow */
    const shape1Style = {
        position: 'absolute',
        top: '15%',
        right: '-5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(66, 133, 244, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
        boxShadow: '0 0 80px var(--color-neon-blue)',
        opacity: 0.4,
        zIndex: 0,
    };

    const shape2Style = {
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(234, 67, 53, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
        boxShadow: '0 0 100px var(--color-neon-pink)',
        opacity: 0.3,
        zIndex: 0,
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
    };

    const headlineStyle = {
        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
        fontWeight: '700', // Google bold
        lineHeight: '1.1',
        color: 'var(--color-text-main)',
        marginBottom: '1.5rem',
        letterSpacing: '-1px',
        fontFamily: "'Google Sans', Roboto, sans-serif",
    };

    const subheadStyle = {
        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
        color: 'var(--color-text-muted)',
        marginBottom: '3rem',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6',
        fontWeight: '300',
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        marginBottom: '4rem',
    };

    return (
        <section style={heroStyle}>
            <div style={shape1Style}></div>
            <div style={shape2Style}></div>

            <div className="container">
                <div style={contentStyle} className="animate-fade-in">
                    <h1 style={headlineStyle}>
                        Discover Your True Potential with <span style={{ color: 'var(--color-google-blue)', textShadow: '0 0 20px rgba(66, 133, 244, 0.3)' }}>your unique value</span>
                    </h1>
                    <p style={subheadStyle}>
                        The only platform which guides on your voice and gives you all the resources to <span style={{ borderBottom: '2px solid var(--color-neon-green)' }}>shine you</span>.
                    </p>
                    <div style={buttonGroupStyle}>
                        <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={onGetStarted}>
                            Get Started
                        </button>
                        <button className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
