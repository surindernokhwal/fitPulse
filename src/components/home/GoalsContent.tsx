import { useState } from "react";
import "./Dashboard.css";

type GoalId = "weight_loss" | "weight_gain" | "muscle_build" | "just_fit";
type DurationId = "4w" | "8w" | "12w" | "6m" | "1y";

interface Goal {
  id: GoalId;
  emoji: string;
  label: string;
  tagline: string;
  color: string;
  gradient: string;
  diet: string[];
  workout: string[];
  tips: string[];
}

interface Duration {
  id: DurationId;
  label: string;
  weeks: number;
  description: string;
}

const goals: Goal[] = [
  {
    id: "weight_loss",
    emoji: "🔥",
    label: "Weight Loss",
    tagline: "Burn fat, feel lighter",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef444420, #f59e0b10)",
    diet: [
      "Caloric deficit of 300–500 kcal/day",
      "High protein (40%) to preserve muscle",
      "Complex carbs only — oats, sweet potato, quinoa",
      "Eat 5–6 small meals to keep metabolism active",
      "Avoid sugar, fried foods & processed snacks",
    ],
    workout: [
      "HIIT 3× per week (20–30 min sessions)",
      "Strength training 3× per week (preserves lean muscle)",
      "Daily 30 min brisk walks",
      "Active rest — yoga or swimming on off-days",
      "Track steps — target 8,000–10,000 per day",
    ],
    tips: [
      "🌊 Drink 3–4L of water daily",
      "😴 Sleep 7–8 hours — poor sleep increases cortisol & appetite",
      "📸 Take weekly progress photos to stay motivated",
    ],
  },
  {
    id: "weight_gain",
    emoji: "⬆️",
    label: "Weight Gain",
    tagline: "Build mass, gain strength",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f620, #818cf810)",
    diet: [
      "Caloric surplus of 300–500 kcal/day above maintenance",
      "High carb + high protein (3,000–3,500 kcal/day)",
      "Eat every 3 hours — never miss a meal",
      "Include calorie-dense foods: nuts, avocado, whole milk",
      "Post-workout: whey protein + banana within 30 minutes",
    ],
    workout: [
      "Heavy compound lifts: Squats, Deadlifts, Bench Press",
      "Progressive overload — increase weight each week",
      "3–4 sets × 6–10 reps per exercise",
      "Train 5× per week with a Push/Pull/Legs split",
      "Minimal cardio — max 20 min light cardio per session",
    ],
    tips: [
      "😴 Sleep 8–9 hours — growth hormone peaks during deep sleep",
      "🧘 Manage stress — cortisol suppresses muscle growth",
      "📊 Track calories daily using a food logging app",
    ],
  },
  {
    id: "muscle_build",
    emoji: "💪",
    label: "Muscle Build",
    tagline: "Sculpt, tone & get strong",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f720, #7c3aed10)",
    diet: [
      "1.6–2.2g of protein per kg of bodyweight per day",
      "Lean proteins: chicken, tofu, eggs, fish, paneer",
      "Eat complex carbs around workouts for energy",
      "Include healthy fats: olive oil, nuts, avocado",
      "Creatine monohydrate (5g/day) — scientifically proven",
    ],
    workout: [
      "Hypertrophy-focused: 3–4 sets × 8–15 reps",
      "Train each muscle group 2× per week",
      "Tempo training: 3 seconds down, 1 up (more muscle damage)",
      "Include isolation exercises — curls, flyes, lateral raises",
      "Rest 60–90 seconds between sets",
    ],
    tips: [
      "🔁 Change your workout every 6–8 weeks to prevent plateaus",
      "📸 Track measurements (chest, arms, waist) not just weight",
      "💊 Consider Omega-3 to reduce inflammation & support joints",
    ],
  },
  {
    id: "just_fit",
    emoji: "⚡",
    label: "Just Fit",
    tagline: "Stay healthy, feel great",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b98120, #34d39910)",
    diet: [
      "Balanced macros: 40% carbs, 30% protein, 30% fat",
      "Eat 3 full meals + 2 healthy snacks per day",
      "Focus on whole, minimally processed foods",
      "Stay hydrated — 2.5–3L of water daily",
      "Allow 1 flex/cheat meal per week to stay consistent",
    ],
    workout: [
      "3× strength training + 2× cardio per week",
      "Include a sport or activity you genuinely enjoy",
      "Daily 20–30 min walk or cycling",
      "Weekend active recovery — hiking, swimming, yoga",
      "Don't skip rest days — recovery is part of fitness",
    ],
    tips: [
      "🏃 Consistency > intensity — show up even on low energy days",
      "😄 Find a workout buddy for motivation & accountability",
      "🎯 Set small weekly milestones, not just the final goal",
    ],
  },
];

const durations: Duration[] = [
  { id: "4w", label: "4 Weeks", weeks: 4, description: "Quick starter — build habits & see early results" },
  { id: "8w", label: "8 Weeks", weeks: 8, description: "Foundation phase — noticeable body composition change" },
  { id: "12w", label: "12 Weeks", weeks: 12, description: "Transformation phase — significant visible results" },
  { id: "6m", label: "6 Months", weeks: 24, description: "Deep change — reshape your body & lifestyle" },
  { id: "1y", label: "1 Year", weeks: 52, description: "Long-term mastery — total lifestyle transformation" },
];

const GoalsContent = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalId | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationId | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const activeGoal = goals.find(g => g.id === selectedGoal);
  const activeDuration = durations.find(d => d.id === selectedDuration);

  const handleConfirm = () => {
    if (selectedGoal && selectedDuration) setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setSelectedGoal(null);
    setSelectedDuration(null);
  };

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '32px' }}>
        <h1 className="welcome-title">My Fitness Goal</h1>
        <p className="welcome-subtitle">Choose your target goal and commitment duration to get a personalised roadmap.</p>
      </div>

      {!confirmed ? (
        <>
          {/* Step 1: Goal Selection */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step 1 — Select Your Goal
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {goals.map((goal, idx) => (
                <div
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  style={{
                    padding: '24px', borderRadius: '16px', cursor: 'pointer',
                    background: selectedGoal === goal.id ? goal.gradient : 'var(--bg-card)',
                    border: `2px solid ${selectedGoal === goal.id ? goal.color : 'var(--border-color)'}`,
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    animation: `fadeInUp 0.4s ease-out ${idx * 0.07}s both`,
                    transform: selectedGoal === goal.id ? 'translateY(-4px)' : 'none',
                    boxShadow: selectedGoal === goal.id ? `0 8px 24px ${goal.color}30` : 'none',
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{goal.emoji}</div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: selectedGoal === goal.id ? goal.color : 'var(--text-main)' }}>
                    {goal.label}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{goal.tagline}</p>
                  {selectedGoal === goal.id && (
                    <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: goal.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span style={{ fontSize: '12px', color: goal.color, fontWeight: '700' }}>Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Duration Selection */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step 2 — Choose Duration
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {durations.map((dur, idx) => {
                const color = activeGoal?.color ?? '#3b82f6';
                return (
                  <div
                    key={dur.id}
                    onClick={() => setSelectedDuration(dur.id)}
                    style={{
                      flex: '1 1 140px', padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
                      border: `2px solid ${selectedDuration === dur.id ? color : 'var(--border-color)'}`,
                      backgroundColor: selectedDuration === dur.id ? `${color}15` : 'var(--bg-card)',
                      transition: 'all 0.2s',
                      animation: `fadeInUp 0.4s ease-out ${idx * 0.08 + 0.3}s both`,
                      transform: selectedDuration === dur.id ? 'translateY(-3px)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: '800', color: selectedDuration === dur.id ? color : 'var(--text-main)', marginBottom: '4px' }}>{dur.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{dur.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confirm Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={handleConfirm}
              disabled={!selectedGoal || !selectedDuration}
              style={{
                padding: '14px 36px', borderRadius: '12px', border: 'none',
                background: selectedGoal && selectedDuration
                  ? `linear-gradient(135deg, ${activeGoal?.color}, ${activeGoal?.color}aa)`
                  : 'var(--border-color)',
                color: 'white', fontWeight: '700', fontSize: '15px',
                cursor: selectedGoal && selectedDuration ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px',
                boxShadow: selectedGoal && selectedDuration ? `0 6px 20px ${activeGoal?.color}50` : 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Set My Goal & View Plan
            </button>
          </div>
        </>
      ) : (
        /* Results / Roadmap Panel */
        activeGoal && activeDuration && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out both' }}>
            {/* Goal Header Banner */}
            <div
              className="content-card"
              style={{
                background: activeGoal.gradient,
                borderTop: `4px solid ${activeGoal.color}`,
                marginBottom: '28px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '56px' }}>{activeGoal.emoji}</div>
                <div>
                  <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: activeGoal.color }}>{activeGoal.label}</h2>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{activeGoal.tagline}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Commitment</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: '800', color: activeGoal.color }}>{activeDuration.label}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{activeDuration.weeks} weeks · {activeDuration.description}</p>
              </div>
            </div>

            {/* Diet + Workout Split */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {/* Diet Plan */}
              <div className="content-card" style={{ borderTop: `4px solid ${activeGoal.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${activeGoal.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🥗</div>
                  <div>
                    <h2 className="card-title" style={{ margin: 0 }}>Diet Strategy</h2>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>Nutrition guidelines for {activeGoal.label}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeGoal.diet.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '12px 14px', backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: '10px', borderLeft: `3px solid ${activeGoal.color}`,
                      fontSize: '14px', lineHeight: '1.5',
                      animation: `fadeInUp 0.35s ease-out ${idx * 0.07}s both`,
                      transition: 'transform 0.2s', cursor: 'default'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Workout Plan */}
              <div className="content-card" style={{ borderTop: `4px solid ${activeGoal.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${activeGoal.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏋️</div>
                  <div>
                    <h2 className="card-title" style={{ margin: 0 }}>Workout Strategy</h2>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>Exercise guidelines for {activeGoal.label}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeGoal.workout.map((item, idx) => (
                    <div key={idx} style={{
                      padding: '12px 14px', backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: '10px', borderLeft: `3px solid ${activeGoal.color}`,
                      fontSize: '14px', lineHeight: '1.5',
                      animation: `fadeInUp 0.35s ease-out ${idx * 0.07}s both`,
                      transition: 'transform 0.2s', cursor: 'default'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="content-card" style={{ borderTop: `4px solid ${activeGoal.color}`, marginBottom: '28px' }}>
              <h2 className="card-title" style={{ marginBottom: '16px' }}>⭐ Pro Tips</h2>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {activeGoal.tips.map((tip, idx) => (
                  <div key={idx} style={{
                    flex: '1 1 240px', padding: '16px', backgroundColor: `${activeGoal.color}12`,
                    borderRadius: '12px', border: `1px solid ${activeGoal.color}30`,
                    fontSize: '14px', lineHeight: '1.6',
                    animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both`,
                  }}>
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Bar */}
            <div className="content-card" style={{ marginBottom: '28px' }}>
              <h2 className="card-title" style={{ marginBottom: '20px' }}>📅 Your {activeDuration.label} Timeline</h2>
              <div style={{ position: 'relative', paddingLeft: '24px' }}>
                {[
                  { week: 'Week 1–2', title: 'Adaptation Phase', desc: 'Your body adjusts to the new routine. Energy may dip slightly — stay consistent.' },
                  { week: `Week 3–${Math.min(6, activeDuration.weeks)}`, title: 'Momentum Phase', desc: 'Habits begin to solidify. Early physical changes become noticeable.' },
                  { week: `Week ${Math.min(7, activeDuration.weeks)}–${Math.floor(activeDuration.weeks / 2)}`, title: 'Progress Phase', desc: 'Clear visible results. Strength or endurance measurably improves.' },
                  { week: `Week ${Math.floor(activeDuration.weeks / 2) + 1}–${activeDuration.weeks}`, title: 'Mastery Phase', desc: 'Goal fully achieved. This is now your lifestyle, not just a routine.' },
                ].filter(item => !item.week.includes('NaN')).map((phase, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx < 3 ? '20px' : '0', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-24px', top: '0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: activeGoal.color, flexShrink: 0 }} />
                      {idx < 3 && <div style={{ width: '2px', flex: 1, backgroundColor: `${activeGoal.color}40`, marginTop: '4px', height: '50px' }} />}
                    </div>
                    <div style={{ animation: `fadeInUp 0.4s ease-out ${idx * 0.12}s both` }}>
                      <span style={{ fontSize: '11px', color: activeGoal.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{phase.week}</span>
                      <h4 style={{ margin: '4px 0 6px 0', fontSize: '15px' }}>{phase.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              style={{
                padding: '12px 28px', borderRadius: '10px', border: `2px solid var(--border-color)`,
                background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
                fontWeight: '600', fontSize: '14px', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = activeGoal.color; e.currentTarget.style.color = activeGoal.color; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 .49-3.51"></path>
              </svg>
              Change Goal
            </button>
          </div>
        )
      )}
    </main>
  );
};

export default GoalsContent;
