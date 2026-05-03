import { NavLink, useNavigate } from "react-router-dom";
import "./Dashboard.css";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Semi-transparent overlay to close sidebar on Mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        {/* Mobile Close Button inside sidebar */}
        <button className="mobile-close-btn" onClick={closeSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          FitPulse
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/home" 
            end
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </NavLink>
          <NavLink 
            to="/home/profile" 
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Profile
          </NavLink>
          <NavLink 
            to="/home/diet-plan" 
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Diet Plan
          </NavLink>
          <NavLink 
            to="/home/workout-plan" 
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
            Workout Plan
          </NavLink>
          <NavLink 
            to="/home/bmi-calculator" 
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            BMI Calculator
          </NavLink>
          <NavLink 
            to="/home/contact" 
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Contact
          </NavLink>
          <NavLink 
            to="/home/goals" 
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            My Goals
          </NavLink>
        </nav>

        <div className="pro-plan-card">
          <h4>PRO PLAN</h4>
          <p>Unlock personalized AI coaching and advanced analytics.</p>
          <button className="upgrade-btn" onClick={() => { closeSidebar(); navigate('/home/pro-plan'); }}>Upgrade Now</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
