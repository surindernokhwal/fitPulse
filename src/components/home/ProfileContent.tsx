import { useOutletContext } from "react-router-dom";
import "./Dashboard.css";

const ProfileContent = () => {
  const { userName } = useOutletContext<{ userName: string, userId: string | null }>();

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '32px' }}>
        <h1 className="welcome-title">Your Profile</h1>
        <p className="welcome-subtitle">Manage your account settings and fitness preferences.</p>
      </div>

      <div className="main-split" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr', alignItems: 'start' }}>
        {/* Left Side: Avatar & Summary */}
        <div className="content-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '4px solid var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            position: 'relative'
          }}>
            <span style={{ fontSize: '48px' }}>👤</span>
            <button style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--border-color)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
          </div>
          
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{userName || "User"}</h2>
          <p style={{ margin: '0 0 16px 0', color: 'var(--text-muted)', fontSize: '14px' }}>Free Plan Member</p>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Workouts Completed</span>
              <span style={{ fontWeight: 'bold' }}>42</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Streak</span>
              <span style={{ fontWeight: 'bold' }}>5 Days</span>
            </div>
          </div>
        </div>

        {/* Right Side: Settings Form */}
        <div className="content-card">
          <h2 className="card-title" style={{ marginBottom: '24px' }}>Personal Information</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 calc(50% - 8px)' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>First Name</label>
                <input 
                  type="text" 
                  defaultValue={userName}
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
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Last Name</label>
                <input 
                  type="text" 
                  defaultValue=""
                  placeholder="Enter your last name"
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
              <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Email Address</label>
              <input 
                type="email" 
                defaultValue=""
                placeholder="your.email@example.com"
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
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 calc(50% - 8px)' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(555) 123-4567"
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
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Date of Birth</label>
                <input 
                  type="date" 
                  style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    color: 'white', 
                    outline: 'none',
                    colorScheme: 'dark'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                type="button" 
                style={{
                  backgroundColor: 'var(--accent-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;
