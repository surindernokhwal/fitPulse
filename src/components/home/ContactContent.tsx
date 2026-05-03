import emailjs from "emailjs-com";
import "./Dashboard.css";

const ContactContent = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    // 1️⃣ Send email to YOU (admin)
    emailjs.sendForm(
      "service_esiddi3",
      "template_zugtnfu",
      form,
      "litsGbJVRCaAu2DtQ"
    );

    // 2️⃣ Send auto-reply to USER
    emailjs.sendForm(
      "service_esiddi3",
      "template_1xirwzr",
      form,
      "litsGbJVRCaAu2DtQ"
    );

    alert("Message sent successfully!");
    form.reset();
  };

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '32px' }}>
        <h1 className="welcome-title">Contact Support</h1>
        <p className="welcome-subtitle">Have questions or need help with your fitness journey? Reach out to us!</p>
      </div>

      <div className="main-split" style={{ gridTemplateColumns: '1fr 2fr', alignItems: 'start' }}>
        
        {/* Left Side: Contact Information Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="content-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', 
              color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Email Us</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
              For general inquiries, account issues, or billing.
            </p>
            <span style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>support@fitpulse.app</span>
          </div>

          <div className="content-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', 
              color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Call Us</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
              Mon-Fri from 9am to 6pm (EST).
            </p>
            <span style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>1-800-FIT-PULSE</span>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="content-card">
          <h2 className="card-title" style={{ marginBottom: '24px' }}>Send us a message</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 calc(50% - 8px)' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  required
                  style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    color: 'white', 
                    outline: 'none' 
                  }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 calc(50% - 8px)' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  required
                  style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    color: 'white', 
                    outline: 'none' 
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Subject <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <select
                  required
                  name="subject"
                  style={{ 
                    width: '100%',
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    color: 'white', 
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer'
                  }} 
                >
                  <option value="" style={{ color: 'black' }}>Select a topic...</option>
                  <option value="fitness_advice" style={{ color: 'black' }}>General Fitness Advice</option>
                  <option value="diet_plan" style={{ color: 'black' }}>Diet Plan Modifications</option>
                  <option value="workout_form" style={{ color: 'black' }}>Workout Routines & Form Check</option>
                  <option value="coaching" style={{ color: 'black' }}>AI Coaching Inquiry</option>
                  <option value="account" style={{ color: 'black' }}>Account & Billing</option>
                  <option value="other" style={{ color: 'black' }}>Other</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Message <span style={{ color: '#ef4444' }}>*</span></label>
              <textarea 
                rows={5}
                name="message"
                placeholder="How can we help you today?"
                required
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  color: 'white', 
                  outline: 'none',
                  resize: 'vertical'
                }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}>
              <button 
                type="submit" 
                style={{
                  backgroundColor: 'var(--accent-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactContent;
