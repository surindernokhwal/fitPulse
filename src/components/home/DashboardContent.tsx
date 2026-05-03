import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

type GoalId = "weight_loss" | "weight_gain" | "muscle_build" | "just_fit";
type DurationId = "4w" | "8w" | "12w" | "6m" | "1y";

const goalOptions = [
  { id: "weight_loss", emoji: "🔥", label: "Weight Loss", color: "#ef4444" },
  { id: "weight_gain", emoji: "⬆️", label: "Weight Gain", color: "#3b82f6" },
  { id: "muscle_build", emoji: "💪", label: "Muscle Build", color: "#a855f7" },
  { id: "just_fit", emoji: "⚡", label: "Just Fit", color: "#10b981" },
];

const durationOptions = [
  { id: "4w", label: "4 Weeks" },
  { id: "8w", label: "8 Weeks" },
  { id: "12w", label: "12 Weeks" },
  { id: "6m", label: "6 Months" },
  { id: "1y", label: "1 Year" },
];

const data = [
  { name: "Mon", activity: 40 },
  { name: "Tue", activity: 60 },
  { name: "Wed", activity: 30 },
  { name: "Thu", activity: 90 },
  { name: "Fri", activity: 45 },
  { name: "Sat", activity: 120 },
  { name: "Sun", activity: 75 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{label}</p>
        <p style={{ margin: 0, color: 'var(--accent-blue)', fontWeight: 'bold' }}>Active: {payload[0].value} mins</p>
      </div>
    );
  }
  return null;
};

const DashboardContent = () => {
  const { userName } = useOutletContext<{ userName: string }>();
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<GoalId | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationId | null>(null);
  const activeGoal = goalOptions.find(g => g.id === selectedGoal);
  const activeDuration = durationOptions.find(d => d.id === selectedDuration);

  return (
    <main className="dashboard-content">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, {userName}! <span style={{ fontSize: '24px' }}>👋</span>
        </h1>
        <p className="welcome-subtitle">
          You've completed <span>85%</span> of your weekly goal. Keep it up!
        </p>
      </div>

      {/* ── Inline Target Goal Widget ── */}
      <div className="content-card" style={{ marginBottom: '24px', borderTop: `4px solid ${activeGoal?.color ?? 'var(--accent-blue)'}`, animation: 'fadeInUp 0.45s ease-out both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <h2 className="card-title" style={{ margin: 0 }}>🎯 My Target Goal</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
              {activeGoal && activeDuration
                ? `Active: ${activeGoal.emoji} ${activeGoal.label} · ${activeDuration.label}`
                : 'Set your fitness goal to get a personalised plan'}
            </p>
          </div>
          {activeGoal && (
            <button
              onClick={() => navigate('/home/goals', { state: { selectedGoal, selectedDuration, confirmed: !!(selectedGoal && selectedDuration) } })}
              style={{ padding: '8px 18px', borderRadius: '8px', border: `1px solid ${activeGoal.color}`, backgroundColor: `${activeGoal.color}15`, color: activeGoal.color, cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}
            >
              View Full Plan →
            </button>
          )}
        </div>

        {/* Goal Cards Row */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {goalOptions.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGoal(g.id as GoalId)}
              style={{
                flex: '1 1 130px', padding: '14px 12px', borderRadius: '12px', border: `2px solid`,
                borderColor: selectedGoal === g.id ? g.color : 'var(--border-color)',
                backgroundColor: selectedGoal === g.id ? `${g.color}18` : 'transparent',
                color: selectedGoal === g.id ? g.color : 'var(--text-muted)',
                cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '8px',
                transform: selectedGoal === g.id ? 'translateY(-2px)' : 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>

        {/* Duration Row */}
        {selectedGoal && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', animation: 'fadeInUp 0.3s ease-out both' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px', fontWeight: '600' }}>Duration:</span>
            {durationOptions.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDuration(d.id as DurationId)}
                style={{
                  padding: '7px 16px', borderRadius: '8px', border: `1px solid`,
                  borderColor: selectedDuration === d.id ? (activeGoal?.color ?? 'var(--accent-blue)') : 'var(--border-color)',
                  backgroundColor: selectedDuration === d.id ? `${activeGoal?.color ?? 'var(--accent-blue)'}20` : 'transparent',
                  color: selectedDuration === d.id ? (activeGoal?.color ?? 'white') : 'var(--text-muted)',
                  cursor: 'pointer', fontWeight: '600', fontSize: '12px', transition: 'all 0.2s',
                }}
              >
                {d.label}
              </button>
            ))}
            {selectedGoal && selectedDuration && (
              <button
                onClick={() => navigate('/home/goals', { state: { selectedGoal, selectedDuration, confirmed: true } })}
                style={{
                  marginLeft: 'auto', padding: '7px 20px', borderRadius: '8px', border: 'none',
                  background: activeGoal?.color, color: 'white',
                  cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: 'opacity 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                See My Roadmap →
              </button>
            )}
          </div>
        )}
      </div>

      <div className="stats-grid">
        {/* Workouts */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="stat-badge positive">+12%</div>
          </div>
          <div className="stat-info">
            <h3>Workouts</h3>
            <p className="stat-value">12 / 15</p>
          </div>
          <div className="progress-container">
            <div className="progress-bar blue" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Calories */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
              </svg>
            </div>
            <div className="stat-badge neutral">-5%</div>
          </div>
          <div className="stat-info">
            <h3>Calories</h3>
            <p className="stat-value">1,840 kcal</p>
            <p className="stat-footer">Daily target: 2,200 kcal</p>
          </div>
        </div>

        {/* BMI Index */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
          </div>
          <div className="stat-info">
            <h3>BMI Index</h3>
            <p className="stat-value">22.4</p>
            <p className="stat-footer success">Healthy Weight</p>
          </div>
        </div>

        {/* Weight Loss */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: 'transparent', color: 'var(--text-main)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
          </div>
          <div className="stat-info">
            <h3>Weight Loss</h3>
            <p className="stat-value">4.2 kg</p>
            <p className="stat-footer">This month</p>
          </div>
        </div>
      </div>

      <div className="main-split">
        {/* Activity Chart Area Placeholder replaced by Recharts */}
        <div className="content-card">
          <div className="card-header">
            <h2 className="card-title">Activity Overview</h2>
            <select className="card-select">
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="chart-area" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="activity" stroke="var(--accent-blue)" strokeWidth={4} dot={false} activeDot={{ r: 8, fill: 'var(--accent-blue)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Goals */}
        <div className="content-card">
          <div className="card-header">
            <h2 className="card-title">Daily Goals</h2>
          </div>
          
          <div className="daily-goals-list">
            <div className="goal-item">
              <div className="goal-header">
                <span>Steps</span>
                <span className="goal-value">8,432 / 10,000</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar green" style={{ width: '84%' }}></div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-header">
                <span>Water Intake</span>
                <span className="goal-value">1.5 / 2.5 L</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar blue" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-header">
                <span>Sleep</span>
                <span className="goal-value">6.5 / 8 hrs</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar purple" style={{ width: '81%' }}></div>
              </div>
            </div>
          </div>

          <button className="add-log-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Log
          </button>
        </div>
      </div>

      {/* Tertiary Split: Macros and Badges */}
      <div className="main-split" style={{ marginTop: '20px' }}>
        
        {/* Nutrition Macros */}
        <div className="content-card">
          <div className="card-header">
            <h2 className="card-title">Today's Macros</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>1,840 / 2,200 kcal</span>
          </div>
          
          <div className="daily-goals-list">
            <div className="goal-item">
              <div className="goal-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }}></div>
                  Protein
                </span>
                <span className="goal-value">120g / 150g</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar blue" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }}></div>
                  Carbs
                </span>
                <span className="goal-value">200g / 250g</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar green" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  Fats
                </span>
                <span className="goal-value">45g / 65g</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '69%', backgroundColor: '#f59e0b' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="content-card">
          <div className="card-header">
            <h2 className="card-title">Recent Badges</h2>
            <span style={{ fontSize: '13px', color: 'var(--accent-blue)', cursor: 'pointer' }}>View All</span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', flex: 1 }}>
              <span style={{ fontSize: '32px' }}>🔥</span>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>7 Day Streak</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', flex: 1 }}>
              <span style={{ fontSize: '32px' }}>💧</span>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>Hydration Master</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', flex: 1 }}>
              <span style={{ fontSize: '32px' }}>🏃</span>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>50k Steps</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default DashboardContent;
