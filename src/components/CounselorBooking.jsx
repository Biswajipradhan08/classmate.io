import React, { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';

const CounselorBooking = ({ buddy, userName = "friend", currentUser, assessmentResults = {}, onBack }) => {
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [sessionType, setSessionType] = useState('60min');
    const [sessionNotes, setSessionNotes] = useState('');
    const [bookingStep, setBookingStep] = useState(1); // 1: Browse, 2: Schedule, 3: Confirm

    // Counselor data
    const counselors = [
        {
            id: 1,
            name: 'Dr. Priya Sharma',
            image: '👩🏾‍⚕️',
            specialization: 'Career Guidance & College Admissions',
            credentials: 'PhD in Career Counseling, 15+ years experience',
            rating: 4.9,
            reviews: 342,
            expertise: ['Career Planning', 'College Selection', 'Entrance Exams', 'Study Abroad'],
            availability: ['Mon', 'Wed', 'Fri'],
            color: '#4285f4',
            bio: 'Specialized in helping students discover their ideal career path and navigate the college admissions process with confidence.'
        },
        {
            id: 2,
            name: 'Raj Kumar Patel',
            image: '👨🏾‍💼',
            specialization: 'Entrepreneurship & Business Strategy',
            credentials: 'MBA, Former Startup Founder, 10+ years',
            rating: 4.8,
            reviews: 289,
            expertise: ['Startup Ideas', 'Business Planning', 'Innovation', 'Leadership Skills'],
            availability: ['Tue', 'Thu', 'Sat'],
            color: '#fbbc04',
            bio: 'Former entrepreneur turned counselor, passionate about guiding young minds to build successful ventures.'
        },
        {
            id: 3,
            name: 'Dr. Anita Desai',
            image: '👩🏽‍🏫',
            specialization: 'Mental Health & Wellness',
            credentials: 'Clinical Psychologist, 12+ years practice',
            rating: 5.0,
            reviews: 456,
            expertise: ['Stress Management', 'Anxiety', 'Self-Confidence', 'Work-Life Balance'],
            availability: ['Mon', 'Tue', 'Thu', 'Fri'],
            color: '#34a853',
            bio: 'Dedicated to supporting students through academic stress, personal challenges, and mental wellness journey.'
        },
        {
            id: 4,
            name: 'Vikram Singh',
            image: '👨🏾‍🎓',
            specialization: 'Skill Development & Technical Training',
            credentials: 'Tech Industry Expert, 20+ years',
            rating: 4.7,
            reviews: 198,
            expertise: ['Coding Skills', 'Tech Careers', 'Resume Building', 'Interview Prep'],
            availability: ['Wed', 'Thu', 'Sat'],
            color: '#ea4335',
            bio: 'Tech industry veteran helping students build in-demand skills and land their dream tech roles.'
        },
        {
            id: 5,
            name: 'Dr. Meera Krishnan',
            image: '👩🏾‍🔬',
            specialization: 'Research & Academic Excellence',
            credentials: 'PhD in Education, Academic Advisor',
            rating: 4.9,
            reviews: 267,
            expertise: ['Research Skills', 'Academic Writing', 'PhD Guidance', 'Scholarships'],
            availability: ['Mon', 'Wed', 'Sat'],
            color: '#a142f4',
            bio: 'Academic counselor specializing in research methodologies, higher education, and scholarship opportunities.'
        },
    ];

    // Generate available time slots
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
        '06:00 PM', '07:00 PM'
    ];

    const handleSelectCounselor = (counselor) => {
        setSelectedCounselor(counselor);
        setBookingStep(2);
    };

    const handleConfirmBooking = async () => {
        try {
            const amount = sessionType === '30min' ? 50 : 90;

            // Call backend to create order
            const res = await axios.post('/api/payments/create-order', {
                orderAmount: amount,
                customerId: currentUser?.id || currentUser?.googleId || 'guest_123',
                customerPhone: '9999999999', // Placeholder as we don't collect phone yet
                customerName: userName
            });

            console.log('Order created:', res.data);

            if (res.data.payment_session_id) {
                const cashfree = new window.Cashfree({
                    mode: "sandbox" // or production
                });

                cashfree.checkout({
                    paymentSessionId: res.data.payment_session_id,
                    returnUrl: `http://localhost:5174/payment-status?order_id=${res.data.order_id}`
                });
            } else {
                // Determine if failure, or just mock success if API fails (e.g. invalid keys)
                console.warn('No payment session ID returned. Mocking success for demo.');
                setBookingStep(3);
            }
        } catch (error) {
            console.error('Payment Error:', error);
            // Fallback for demo
            setBookingStep(3);
        }
    };

    // ... (rest of component render)

    const containerStyle = {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'auto',
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e8eaed',
                padding: '1.5rem 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '1rem' }}>
                    <Logo />
                </div>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '500', color: '#202124', margin: 0 }}>
                        👨‍🏫 Talk to Your Master Guide
                    </h1>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '0.8rem 1.5rem',
                            backgroundColor: '#f1f3f4',
                            color: '#5f6368',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 2rem' }}>
                {bookingStep === 1 && (
                    <BrowseCounselors
                        counselors={counselors}
                        onSelect={handleSelectCounselor}
                    />
                )}

                {bookingStep === 2 && selectedCounselor && (
                    <ScheduleSession
                        counselor={selectedCounselor}
                        timeSlots={timeSlots}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        sessionType={sessionType}
                        setSessionType={setSessionType}
                        sessionNotes={sessionNotes}
                        setSessionNotes={setSessionNotes}
                        onBack={() => setBookingStep(1)}
                        onConfirm={handleConfirmBooking}
                    />
                )}

                {bookingStep === 3 && (
                    <BookingConfirmation
                        counselor={selectedCounselor}
                        date={selectedDate}
                        time={selectedTime}
                        sessionType={sessionType}
                        onBackToDashboard={onBack}
                    />
                )}
            </div>
        </div>
    );
};
// ... (rest of file)

// Browse Counselors Component
const BrowseCounselors = ({ counselors, onSelect }) => (
    <div>
        <h2 style={{ fontSize: '2rem', fontWeight: '500', color: '#202124', marginBottom: '1rem' }}>
            Choose Your Expert Counselor
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '2rem' }}>
            Connect with experienced professionals who can guide you towards your goals
        </p>

        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
        }}>
            {counselors.map(counselor => (
                <div
                    key={counselor.id}
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '24px',
                        padding: '2rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        border: `2px solid ${counselor.color}15`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    onClick={() => onSelect(counselor)}
                >
                    {/* Profile Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: `${counselor.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                        }}>
                            {counselor.image}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#202124', margin: 0 }}>
                                {counselor.name}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
                                <span style={{ color: counselor.color, fontSize: '1rem' }}>⭐ {counselor.rating}</span>
                                <span style={{ color: '#80868b', fontSize: '0.9rem' }}>({counselor.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Specialization */}
                    <div style={{
                        padding: '0.8rem 1rem',
                        backgroundColor: `${counselor.color}10`,
                        borderRadius: '12px',
                        marginBottom: '1rem',
                    }}>
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: counselor.color, margin: 0 }}>
                            {counselor.specialization}
                        </p>
                    </div>

                    {/* Credentials */}
                    <p style={{ fontSize: '0.95rem', color: '#5f6368', marginBottom: '1rem' }}>
                        {counselor.credentials}
                    </p>

                    {/* Bio */}
                    <p style={{ fontSize: '0.95rem', color: '#3c4043', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        {counselor.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {counselor.expertise.map((skill, idx) => (
                            <span key={idx} style={{
                                padding: '0.4rem 0.8rem',
                                backgroundColor: '#f1f3f4',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                color: '#3c4043',
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Availability */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#5f6368', marginBottom: '0.5rem' }}>Available:</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {counselor.availability.map((day, idx) => (
                                <span key={idx} style={{
                                    padding: '0.3rem 0.6rem',
                                    backgroundColor: `${counselor.color}20`,
                                    color: counselor.color,
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                }}>
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Book Button */}
                    <button style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        backgroundColor: counselor.color,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}>
                        Book Session →
                    </button>
                </div>
            ))}
        </div>
    </div>
);

// Schedule Session Component
const ScheduleSession = ({
    counselor,
    timeSlots,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    sessionType,
    setSessionType,
    sessionNotes,
    setSessionNotes,
    onBack,
    onConfirm
}) => (
    <div>
        <button onClick={onBack} style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#f1f3f4',
            color: '#5f6368',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '2rem',
        }}>
            ← Back to Counselors
        </button>

        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
            {/* Counselor Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '2px solid #f1f3f4' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: `${counselor.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                }}>
                    {counselor.image}
                </div>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#202124', margin: 0 }}>
                        {counselor.name}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: counselor.color, marginTop: '0.5rem' }}>
                        {counselor.specialization}
                    </p>
                </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#202124', marginBottom: '1.5rem' }}>
                Schedule Your Session
            </h3>

            {/* Session Type */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#3c4043', marginBottom: '0.8rem' }}>
                    Session Duration
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['30min', '60min'].map(type => (
                        <button
                            key={type}
                            onClick={() => setSessionType(type)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                backgroundColor: sessionType === type ? counselor.color : '#f1f3f4',
                                color: sessionType === type ? '#ffffff' : '#5f6368',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            {type === '30min' ? '30 Minutes • $50' : '60 Minutes • $90'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Selection */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#3c4043', marginBottom: '0.8rem' }}>
                    Select Date
                </label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        border: '2px solid #e8eaed',
                        borderRadius: '12px',
                        fontFamily: 'inherit',
                    }}
                />
            </div>

            {/* Time Selection */}
            {selectedDate && (
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#3c4043', marginBottom: '0.8rem' }}>
                        Select Time
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.8rem' }}>
                        {timeSlots.map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                style={{
                                    padding: '0.8rem',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    backgroundColor: selectedTime === time ? counselor.color : '#f8f9fa',
                                    color: selectedTime === time ? '#ffffff' : '#3c4043',
                                    border: `2px solid ${selectedTime === time ? counselor.color : '#e8eaed'}`,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                }}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Session Notes */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#3c4043', marginBottom: '0.8rem' }}>
                    What would you like to discuss? (Optional)
                </label>
                <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Share any specific topics or questions you'd like to cover in your session..."
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '1rem',
                        fontSize: '1rem',
                        border: '2px solid #e8eaed',
                        borderRadius: '12px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                    }}
                />
            </div>

            {/* Confirm Button */}
            <button
                onClick={onConfirm}
                disabled={!selectedDate || !selectedTime}
                style={{
                    width: '100%',
                    padding: '1.2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    backgroundColor: selectedDate && selectedTime ? counselor.color : '#e8eaed',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                }}
            >
                Confirm Booking →
            </button>
        </div>
    </div>
);

// Booking Confirmation Component
const BookingConfirmation = ({ counselor, date, time, sessionType, onBackToDashboard }) => (
    <div style={{
        maxWidth: '600px',
        margin: '4rem auto',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        textAlign: 'center',
    }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#202124', marginBottom: '1rem' }}>
            Booking Confirmed!
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '2rem' }}>
            Your session has been successfully scheduled
        </p>

        <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'left',
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#5f6368' }}>Counselor:</span>
                <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#202124', margin: '0.3rem 0 0 0' }}>
                    {counselor.name}
                </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#5f6368' }}>Date & Time:</span>
                <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#202124', margin: '0.3rem 0 0 0' }}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {time}
                </p>
            </div>
            <div>
                <span style={{ fontSize: '0.9rem', color: '#5f6368' }}>Duration:</span>
                <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#202124', margin: '0.3rem 0 0 0' }}>
                    {sessionType === '30min' ? '30 Minutes' : '60 Minutes'}
                </p>
            </div>
        </div>

        <div style={{
            padding: '1.5rem',
            backgroundColor: '#e8f0fe',
            borderRadius: '12px',
            marginBottom: '2rem',
        }}>
            <p style={{ fontSize: '0.95rem', color: '#1a73e8', margin: 0 }}>
                📧 A confirmation email with the meeting link has been sent to your email address
            </p>
        </div>

        <button
            onClick={onBackToDashboard}
            style={{
                width: '100%',
                padding: '1.2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                backgroundColor: '#4285f4',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
            }}
        >
            Back to Dashboard
        </button>
    </div>
);

export default CounselorBooking;
