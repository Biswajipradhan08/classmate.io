import React from 'react';

const Features = () => {
    const sectionStyle = {
        padding: '6rem 0',
        backgroundColor: '#F8F9FA', /* Google Grey Background */
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '4rem',
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--color-text-main)',
        marginBottom: '1rem',
    };

    const subtitleStyle = {
        color: 'var(--color-text-muted)',
        fontSize: '1.125rem',
        maxWidth: '600px',
        margin: '0 auto',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
    };

    const cardContentStyle = {
        padding: '2rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    /* Google Color Strips for top of cards */
    const getBorderColor = (index) => {
        const colors = [
            'var(--color-google-blue)',
            'var(--color-google-red)',
            'var(--color-google-yellow)',
            'var(--color-google-green)',
            'var(--color-google-blue)'
        ];
        return colors[index % colors.length];
    };

    const features = [
        {
            icon: '🧠',
            title: 'Psychometric Analysis',
            description: 'Get assessed by India’s top psychotherapists to understand your personality, interests, and behavior.',
        },
        {
            icon: '🗣️',
            title: 'Top Career Counsellors',
            description: 'One-on-one guidance from top-notch counsellors to align your passion with the right profession.',
        },
        {
            icon: '🗺️',
            title: 'Career Roadmap',
            description: 'Receive a personalized career path curated by industry experts to guide your professional journey.',
        },
        {
            icon: '🤝',
            title: 'Community Access',
            description: 'Connect with students from across India who share your specific niche and work together collaboratively.',
        },
        {
            icon: '💼',
            title: 'Placement Support',
            description: 'Access the best resources and placement support to ensure you land a job you love.',
        }
    ];

    return (
        <section id="features" style={sectionStyle}>
            <div className="container">
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Everything You Need to Succeed</h2>
                    <p style={subtitleStyle}>
                        We provide a holistic ecosystem to transform your passion into a thriving profession.
                    </p>
                </div>

                <div style={gridStyle}>
                    {features.map((feature, index) => (
                        <div key={index} className="google-card" style={{ borderTop: `4px solid ${getBorderColor(index)}` }}>
                            <div style={cardContentStyle}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '1rem',
                                    color: getBorderColor(index),
                                    filter: `drop-shadow(0 0 5px ${getBorderColor(index)})` /* Subtle neon glow on icon */
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
