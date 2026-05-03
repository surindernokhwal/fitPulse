import "./Dashboard.css";

const ProPlanContent = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      color: "var(--text-muted)",
      features: [
        "Standard BMI Calculator",
        "Basic Weekly Workout Plan",
        "Generic Diet Templates"
      ],
      buttonText: "Current Plan",
      isActive: true
    },
    {
      name: "Pro",
      price: "₹699",
      period: "/ month",
      color: "var(--accent-blue)",
      features: [
        "Save & Track BMI History in Cloud",
        "Interactive Analytics Dashboard",
        "Personalized Workout Generators",
        "Macro Tracking Integrations"
      ],
      buttonText: "Upgrade to Pro",
      isActive: false
    },
    {
      name: "Elite",
      price: "₹1499",
      period: "/ month",
      color: "var(--accent-purple)",
      features: [
        "Everything in Pro",
        "1-on-1 AI Fitness Coaching",
        "Progress Photo Timeline",
        "Real-Time Form Correction via Camera"
      ],
      buttonText: "Get Elite",
      isActive: false
    }
  ];

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="welcome-title" style={{ justifyContent: 'center' }}>Upgrade Your Fitness Journey</h1>
        <p className="welcome-subtitle">Unlock advanced analytics and personalized AI coaching to reach your goals faster.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className="content-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              border: plan.name === "Pro" ? '2px solid var(--accent-blue)' : '1px solid transparent',
              position: 'relative'
            }}
          >
            {plan.name === "Pro" && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--accent-blue)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                MOST POPULAR
              </div>
            )}
            
            <h3 style={{ fontSize: '24px', margin: '0 0 16px 0', color: plan.color }}>{plan.name}</h3>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{plan.price}</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{plan.period}</span>
            </div>

            <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: plan.isActive ? 'rgba(255,255,255,0.05)' : plan.color,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: plan.isActive ? 'default' : 'pointer',
                transition: 'opacity 0.2s',
                opacity: plan.isActive ? 0.7 : 1
              }}
              onMouseOver={(e) => { if (!plan.isActive) e.currentTarget.style.opacity = '0.8'; }}
              onMouseOut={(e) => { if (!plan.isActive) e.currentTarget.style.opacity = '1'; }}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProPlanContent;
