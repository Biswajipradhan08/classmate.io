import React from 'react';

const Logo = ({ style = {} }) => {
    const logoPartStyle = (color) => ({
        color: color,
    });

    const defaultStyle = {
        fontSize: '1.4rem',
        fontWeight: '500',
        color: 'var(--color-text-main)',
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        ...style,
    };

    return (
        <div style={defaultStyle}>
            <span style={logoPartStyle('var(--color-google-blue)')}>C</span>
            <span style={logoPartStyle('var(--color-google-red)')}>l</span>
            <span style={logoPartStyle('var(--color-google-yellow)')}>a</span>
            <span style={logoPartStyle('var(--color-google-green)')}>s</span>
            <span style={logoPartStyle('var(--color-google-blue)')}>s</span>
            <span style={logoPartStyle('var(--color-google-red)')}>m</span>
            <span style={logoPartStyle('var(--color-google-yellow)')}>a</span>
            <span style={logoPartStyle('var(--color-google-green)')}>t</span>
            <span style={logoPartStyle('var(--color-google-blue)')}>e</span>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>.io</span>
        </div>
    );
};

export default Logo;
