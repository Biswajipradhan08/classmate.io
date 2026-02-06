import React, { useState } from 'react';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

    const sectionStyle = {
        padding: '6rem 0',
        backgroundColor: '#FFFFFF',
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

    const toggleContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
    };

    const toggleStyle = {
        display: 'flex',
        backgroundColor: '#F1F3F4',
        padding: '0.25rem',
        borderRadius: '2rem',
        position: 'relative',
        cursor: 'pointer',
    };

    const toggleBtnStyle = (active) => ({
        padding: '0.5rem 1.5rem',
        borderRadius: '1.5rem',
        border: 'none',
        backgroundColor: active ? 'white' : 'transparent',
        color: active ? 'var(--color-google-blue)' : 'var(--color-text-muted)',
        boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        fontWeight: '500',
        transition: 'all 0.3s ease',
    });

    const cardsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
    };

    const pricingCardStyle = {
        flex: '1',
        minWidth: '300px',
        maxWidth: '400px',
        padding: '0 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const planHeaderStyle = {
        width: '100%',
        padding: '2rem',
        textAlign: 'center',
        borderBottom: '1px solid #F1F3F4',
    };

    const priceStyle = {
        fontSize: '3rem',
        fontWeight: '700',
        color: 'var(--color-text-main)',
        margin: '1rem 0 0.5rem',
    };

    const featureListStyle = {
        listStyle: 'none',
        padding: '2rem',
        width: '100%',
        flex: 1,
    };

    const featureItemStyle = {
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--color-text-muted)',
        fontSize: '0.95rem',
    };

    // Google Icons mock
    const CheckIcon = () => (
        <span style={{ color: 'var(--color-google-green)', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</span>
    );

    return (
        <section id="pricing" style={sectionStyle}>
            <div className="container">
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Simple, Transparent Pricing</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Choose the plan that fits your journey.</p>
                </div>

                <div style={toggleContainerStyle}>
                    <span style={{ fontWeight: 500, color: billingCycle === 'monthly' ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>Monthly</span>
                    <div style={toggleStyle}>
                        <button style={toggleBtnStyle(billingCycle === 'monthly')} onClick={() => setBillingCycle('monthly')}>Monthly</button>
                        <button style={toggleBtnStyle(billingCycle === 'yearly')} onClick={() => setBillingCycle('yearly')}>Yearly</button>
                    </div>
                    <span style={{ fontWeight: 500, color: billingCycle === 'yearly' ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>Yearly <span style={{ color: 'var(--color-google-green)', fontSize: '0.8rem' }}>(Save ~30%)</span></span>
                </div>

                <div style={cardsContainerStyle}>
                    {/* Student Plan */}
                    <div className="google-card" style={pricingCardStyle}>
                        {/* Top accent */}
                        <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--color-google-blue)' }}></div>

                        <div style={planHeaderStyle}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-text-main)' }}>Individual Students</h3>
                            <div style={priceStyle}>
                                {billingCycle === 'monthly' ? '₹47' : '₹399'}
                                <span style={{ fontSize: '1rem', fontWeight: '400', color: 'var(--color-text-muted)' }}>
                                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                </span>
                            </div>
                            <p style={{ color: 'var(--color-google-blue)', fontWeight: '500', marginTop: '0.5rem' }}>14-Day Free Trial</p>
                        </div>

                        <ul style={featureListStyle}>
                            <li style={featureItemStyle}><CheckIcon /> Full Psychometric Assessment</li>
                            <li style={featureItemStyle}><CheckIcon /> Personalized Career Roadmap</li>
                            <li style={featureItemStyle}><CheckIcon /> Community Access</li>
                            <li style={featureItemStyle}><CheckIcon /> Placement Support</li>
                            <li style={featureItemStyle}><CheckIcon /> Expert Resources</li>
                        </ul>

                        <button className="btn btn-primary" style={{ width: '80%', marginBottom: '2rem' }}>
                            Start Free Trial
                        </button>
                    </div>

                    {/* School Plan */}
                    <div className="google-card" style={pricingCardStyle}>
                        {/* Top accent */}
                        <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--color-google-yellow)' }}></div>

                        <div style={planHeaderStyle}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-text-main)' }}>Schools & Colleges</h3>
                            <div style={{ ...priceStyle, fontSize: '2rem', padding: '1rem 0' }}>
                                Enterprise
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Contact us for bulk pricing</p>
                        </div>

                        <ul style={featureListStyle}>
                            <li style={featureItemStyle}><CheckIcon /> Bulk Student Enrollment</li>
                            <li style={featureItemStyle}><CheckIcon /> Administration Dashboard</li>
                            <li style={featureItemStyle}><CheckIcon /> Performance Analytics</li>
                            <li style={featureItemStyle}><CheckIcon /> Dedicated Support Manager</li>
                            <li style={featureItemStyle}><CheckIcon /> Custom Integration</li>
                        </ul>

                        <button className="btn btn-outline" style={{ width: '80%', marginBottom: '2rem', borderColor: '#DADCE0', color: 'var(--color-text-main)' }}>
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
