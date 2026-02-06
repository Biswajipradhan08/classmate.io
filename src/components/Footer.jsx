import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#0F172A',
        color: 'white',
        padding: '4rem 0 2rem',
    };

    const containerStyle = {
        maxWidth: 'var(--spacing-container)',
        margin: '0 auto',
        padding: '0 1.5rem',
    };

    const topSectionStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '3rem',
        gap: '2rem',
    };

    const brandColumnStyle = {
        flex: '1',
        minWidth: '250px',
    };

    const brandStyle = {
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '1rem',
        display: 'block',
        color: 'white',
    };

    const descriptionStyle = {
        color: '#94A3B8',
        lineHeight: '1.6',
        maxWidth: '300px',
    };

    const linkColumnStyle = {
        flex: '0 1 200px',
    };

    const headingStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#E2E8F0',
        marginBottom: '1.5rem',
    };

    const listStyle = {
        listStyle: 'none',
        padding: 0,
    };

    const listItemStyle = {
        marginBottom: '0.75rem',
    };

    const linkStyle = {
        color: '#94A3B8',
        textDecoration: 'none',
        transition: 'color 0.2s',
    };

    const bottomSectionStyle = {
        borderTop: '1px solid #1E293B',
        paddingTop: '2rem',
        textAlign: 'center',
        color: '#64748B',
        fontSize: '0.875rem',
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={topSectionStyle}>
                    <div style={brandColumnStyle}>
                        <a href="#" style={brandStyle}>Classmate.io</a>
                        <p style={descriptionStyle}>
                            Empowering students to discover their passion and build a fulfilling career.
                        </p>
                    </div>

                    <div style={linkColumnStyle}>
                        <h4 style={headingStyle}>Product</h4>
                        <ul style={listStyle}>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Features</a></li>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Pricing</a></li>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Schools</a></li>
                        </ul>
                    </div>

                    <div style={linkColumnStyle}>
                        <h4 style={headingStyle}>Resources</h4>
                        <ul style={listStyle}>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Study Material</a></li>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Blog</a></li>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Community</a></li>
                        </ul>
                    </div>

                    <div style={linkColumnStyle}>
                        <h4 style={headingStyle}>Connect</h4>
                        <ul style={listStyle}>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Twitter</a></li>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>LinkedIn</a></li>
                            <li style={listItemStyle}><a href="#" style={linkStyle}>Instagram</a></li>
                        </ul>
                    </div>
                </div>

                <div style={bottomSectionStyle}>
                    <p>&copy; {new Date().getFullYear()} Classmate.io. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
