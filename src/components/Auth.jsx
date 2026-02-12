import React, { useState, useEffect } from 'react';

const Auth = ({ isOpen, onClose, initialMode = 'signin', onAuthSuccess }) => {
    const [mode, setMode] = useState(initialMode); // 'signin', 'signup', 'otp'
    const [activeVerification, setActiveVerification] = useState(null); // 'mobile', 'email'

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        mobile: '',
        email: '',
        dob: '',
        location: '',
        userId: '',
        password: ''
    });

    // Verification State
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otpValue, setOtpValue] = useState(['', '', '', '']);

    // Password Validation State
    const [passErrors, setPassErrors] = useState([]);

    useEffect(() => {
        if (mode === 'signup') {
            validatePassword(formData.password);
        }
    }, [formData.password, mode]);

    const validatePassword = (pass) => {
        if (!pass) {
            setPassErrors([]);
            return;
        }
        const errors = [];
        if (pass.length < 8) errors.push('At least 8 characters');
        if (!/[a-zA-Z]/.test(pass) || !/[0-9]/.test(pass)) errors.push('Must be alphanumeric');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) errors.push('Include a special character');

        // Check for consecutive identical characters
        let hasConsecutive = false;
        for (let i = 0; i < pass.length - 1; i++) {
            if (pass[i] === pass[i + 1]) {
                hasConsecutive = true;
                break;
            }
        }
        if (hasConsecutive) errors.push('No consecutive identical characters (e.g., 11, aa)');

        setPassErrors(errors);
    };

    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
    };

    const modalStyle = {
        backgroundColor: 'white',
        padding: '2rem 2.5rem',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '520px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    };

    const closeBtnStyle = {
        position: 'absolute',
        top: '1.25rem',
        right: '1.25rem',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
        padding: '0.5rem',
    };

    const inputGroupStyle = {
        marginBottom: '1rem',
        position: 'relative'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: 'var(--color-text-muted)',
        marginBottom: '0.4rem',
        marginLeft: '0.2rem',
    };

    const inputStyle = (hasButton = false) => ({
        width: '100%',
        padding: `0.85rem ${hasButton ? '5.5rem' : '1rem'} 0.85rem 1rem`,
        borderRadius: '12px',
        border: '1px solid #DADCE0',
        fontSize: '0.95rem',
        outline: 'none',
        backgroundColor: '#F8F9FA',
        boxSizing: 'border-box',
    });

    const verifyBtnStyle = (verified) => ({
        position: 'absolute',
        right: '0.5rem',
        top: '2.1rem',
        padding: '0.4rem 0.8rem',
        borderRadius: '8px',
        border: 'none',
        fontSize: '0.75rem',
        fontWeight: '700',
        cursor: verified ? 'default' : 'pointer',
        backgroundColor: verified ? 'var(--color-google-green)' : 'var(--color-google-blue)',
        color: 'white',
        transition: 'all 0.2s',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVerifyClick = (type) => {
        setActiveVerification(type);
        setMode('otp');
    };

    const handleOtpComplete = () => {
        if (activeVerification === 'mobile') setIsMobileVerified(true);
        if (activeVerification === 'email') setIsEmailVerified(true);
        setMode('signup');
        setActiveVerification(null);
        setOtpValue(['', '', '', '']);
    };

    const renderVerificationOverlay = () => (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>Verify {activeVerification}</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Enter the 4-digit code sent to your {activeVerification}.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {otpValue.map((val, idx) => (
                    <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        value={val}
                        onChange={(e) => {
                            const newVal = [...otpValue];
                            newVal[idx] = e.target.value;
                            setOtpValue(newVal);
                        }}
                        style={{ width: '45px', height: '45px', textAlign: 'center', fontSize: '1.25rem', border: '1px solid #DADCE0', borderRadius: '8px' }}
                    />
                ))}
            </div>
            <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem' }}
                onClick={handleOtpComplete}
            >
                Verify & Continue
            </button>
        </div>
    );

    const renderSignUp = () => (
        <form onSubmit={(e) => e.preventDefault()}>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                <input name="fullName" type="text" placeholder="John Doe" style={inputStyle()} value={formData.fullName} onChange={handleInputChange} />
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Gender</label>
                <select name="gender" style={inputStyle()} value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Mobile Number</label>
                <input name="mobile" type="tel" placeholder="+91 ..." style={inputStyle(true)} value={formData.mobile} onChange={handleInputChange} />
                <button
                    type="button"
                    style={verifyBtnStyle(isMobileVerified)}
                    onClick={() => !isMobileVerified && handleVerifyClick('mobile')}
                >
                    {isMobileVerified ? 'Verified ✓' : 'Verify'}
                </button>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                <input name="email" type="email" placeholder="john@example.com" style={inputStyle(true)} value={formData.email} onChange={handleInputChange} />
                <button
                    type="button"
                    style={verifyBtnStyle(isEmailVerified)}
                    onClick={() => !isEmailVerified && handleVerifyClick('email')}
                >
                    {isEmailVerified ? 'Verified ✓' : 'Verify'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Date of Birth</label>
                    <input name="dob" type="date" style={inputStyle()} value={formData.dob} onChange={handleInputChange} />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Location</label>
                    <input name="location" type="text" placeholder="City" style={inputStyle()} value={formData.location} onChange={handleInputChange} />
                </div>
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Create Classmate ID</label>
                <input name="userId" type="text" placeholder="@username" style={inputStyle()} value={formData.userId} onChange={handleInputChange} />
            </div>

            <div style={inputGroupStyle}>
                <label style={labelStyle}>Password</label>
                <input name="password" type="password" placeholder="Secure password" style={inputStyle()} value={formData.password} onChange={handleInputChange} />
                {passErrors.length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-google-red)', marginTop: '0.4rem', paddingLeft: '0.2rem' }}>
                        {passErrors.map((err, i) => <div key={i}>• {err}</div>)}
                    </div>
                )}
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', opacity: (isMobileVerified && isEmailVerified && passErrors.length === 0 && formData.password) ? 1 : 0.6 }}
                disabled={!(isMobileVerified && isEmailVerified && passErrors.length === 0 && formData.password)}
                onClick={() => {
                    onAuthSuccess(formData);
                    onClose();
                }}
            >
                Complete Registration
            </button>
        </form>
    );

    const renderSignIn = () => (
        <form onSubmit={(e) => e.preventDefault()}>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Classmate ID or Email</label>
                <input type="text" placeholder="Enter your ID" style={inputStyle()} required />
            </div>
            <div style={inputGroupStyle}>
                <label style={labelStyle}>Password</label>
                <input type="password" placeholder="Enter password" style={inputStyle()} required />
            </div>
            <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                onClick={() => {
                    onAuthSuccess({ userId: 'dummy_user' }); // Mock data for sign-in
                    onClose();
                }}
            >
                Sign In
            </button>
        </form>
    );

    return (
        <div style={overlayStyle} onClick={onClose}>
            <style>{`
        .auth-modal::-webkit-scrollbar { display: none; }
        .auth-modal { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
            <div className="auth-modal" style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button style={closeBtnStyle} onClick={onClose}>×</button>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-main)' }}>
                        {mode === 'otp' ? 'Verification' : 'Classmate.io'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        {mode === 'signin' ? 'Keep learning, keep growing' : mode === 'signup' ? 'Create your student profile' : ''}
                    </p>
                </div>

                {mode !== 'otp' && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <a href="http://localhost:5000/api/auth/google" style={{ textDecoration: 'none' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #dadce0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>G</div>
                        </a>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #dadce0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>in</div>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #dadce0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📞</div>
                    </div>
                )}

                {mode !== 'otp' && (
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#70757a', fontSize: '0.8rem' }}>
                        <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#e8eaed' }} />
                        <span style={{ padding: '0 0.8rem' }}>OR</span>
                        <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#e8eaed' }} />
                    </div>
                )}

                {mode === 'signin' ? renderSignIn() : mode === 'signup' ? renderSignUp() : renderVerificationOverlay()}

                {mode !== 'otp' && (
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {mode === 'signin' ? "Not a member? " : "Joined already? "}
                        <span
                            style={{ color: 'var(--color-google-blue)', cursor: 'pointer', fontWeight: '600' }}
                            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        >
                            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Auth;
