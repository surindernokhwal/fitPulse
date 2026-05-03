import { useState } from "react";
import "./Dashboard.css";

interface HeaderProps {
  handleLogout: () => void;
  toggleSidebar: () => void;
}

const Header = ({ handleLogout, toggleSidebar }: HeaderProps) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <>
      <header className="dashboard-header">
        
        {/* Mobile Hamburger Button */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Notification Bell */}
        <div className="header-icon" onClick={() => setIsNotifOpen(true)} style={{ position: 'relative' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="notification-badge" style={{ position: 'absolute', top: 8, right: 8, width: 10, height: 10, backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b82f6', color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Notification Overlay */}
      {isNotifOpen && <div className="sidebar-overlay" style={{ display: 'block', zIndex: 55 }} onClick={() => setIsNotifOpen(false)}></div>}

      {/* Notification Drawer Component */}
      <div className={`notification-drawer ${isNotifOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Notifications</h3>
          <button 
            onClick={() => setIsNotifOpen(false)} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
          <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', borderLeft: '4px solid var(--accent-blue)' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>Workout Reminder</p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>It's time for your Heavy Push day! Don't forget to dynamically warm up shoulders.</p>
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', display: 'block' }}>10 mins ago</span>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', borderLeft: '4px solid var(--accent-green)' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>Goal Achieved! 🎯</p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>You've successfully hit your 120g protein goal for today.</p>
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', display: 'block' }}>2 hours ago</span>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>Hydration Alert</p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>You're 1 liter behind your water tracking goal today.</p>
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', display: 'block' }}>5 hours ago</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
