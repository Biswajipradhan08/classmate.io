import React from 'react';

const Problem = () => {
    const sectionStyle = {
        padding: '6rem 0',
        backgroundColor: '#FFFFFF',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '4rem',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const titleStyle = {
        fontSize: '2.25rem',
        fontWeight: '700',
        color: 'var(--color-text-main)',
        marginBottom: '1rem',
        lineHeight: '1.3',
    };

    const textStyle = {
        color: 'var(--color-text-muted)',
        fontSize: '1.125rem',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '3rem',
        marginTop: '3rem',
    };

    const cardContentStyle = {
        padding: '3rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const cardTitleStyle = {
        fontSize: '1.75rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: 'var(--color-text-main)',
    };

    return (
        <section style={sectionStyle}>
            <div className="container">
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Bridging the gap between formal education, passion, and possibilities</h2>
                    <p style={textStyle}>
                        Students in Tier 3 colleges often miss out on the rich ecosystem available to others.
                        We are here to change that narrative.
                    </p>
                </div>

                <div style={gridStyle}>
                    {/* Problem Card */}
                    <div className="google-card" style={{ borderLeft: '6px solid var(--color-google-red)' }}>
                        <div style={cardContentStyle}>
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--color-google-red)', textShadow: '0 0 15px var(--color-neon-pink)' }}>🛑</div>
                            <h3 style={cardTitleStyle}>The Challenge</h3>
                            <p style={textStyle}>
                                Limited access to the corporate ecosystem and professional networks leads to
                                unguided career choices. This often results in frustration, stress, and anxiety
                                from working in jobs that don't align with your true passion.
                            </p>
                        </div>
                    </div>

                    {/* Solution Card */}
                    <div className="google-card" style={{ borderLeft: '6px solid var(--color-google-green)' }}>
                        <div style={cardContentStyle}>
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--color-google-green)', textShadow: '0 0 15px var(--color-neon-green)' }}>🚀</div>
                            <h3 style={cardTitleStyle}>The Classmate.io Advantage</h3>
                            <p style={textStyle}>
                                We unlock access to possibilities across India, building a vibrant community of peers.
                                By aligning your personality and passion with market needs, we provide a holistic
                                roadmap for a successful, happy, and profitable career.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
