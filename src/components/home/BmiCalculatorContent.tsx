import { useState } from "react";
import "./Dashboard.css";

type DietType = "veg" | "nonveg";
type BMICategory = "underweight" | "healthy" | "overweight" | "obese";

interface Suggestion {
  diet: { veg: string[]; nonveg: string[] };
  workout: string[];
  tip: string;
  goal: string;
  color: string;
}

const suggestions: Record<BMICategory, Suggestion> = {
  underweight: {
    goal: "Weight Gain & Muscle Building",
    color: "#3b82f6",
    tip: "Focus on caloric surplus with nutrient-dense foods. Aim for 3,000–3,500 kcal/day.",
    diet: {
      veg: [
        "🥛 Full-fat milk + banana smoothie for breakfast",
        "🥜 Peanut butter on whole grain toast (2 slices)",
        "🍚 Large bowl of brown rice with paneer curry (lunch)",
        "🥑 Avocado + chickpea salad mid-day",
        "🧀 Cheese & vegetable pasta (dinner)",
        "🌰 Mixed nuts + dried fruits as snacks",
      ],
      nonveg: [
        "🍳 4 scrambled eggs + whole grain toast (breakfast)",
        "🥛 Full-fat milk + banana protein shake",
        "🍗 Grilled chicken breast (200g) + large quinoa bowl (lunch)",
        "🐟 Salmon fillet + sweet potato (dinner)",
        "🥜 Peanut butter + whey protein shake (snack)",
        "🥩 Lean beef stir-fry with noodles",
      ],
    },
    workout: [
      "🏋️ Heavy compound lifts: Squats, Deadlifts, Bench Press",
      "💪 Progressive overload — increase weight each week",
      "🔄 3 sets × 8–12 reps per exercise",
      "⏱️ Workout 4–5 days per week, 45–60 min sessions",
      "😴 Prioritize 8 hrs of sleep for muscle recovery",
      "🚫 Avoid excessive cardio — it burns precious calories",
    ],
  },
  healthy: {
    goal: "Maintenance & Athletic Performance",
    color: "#10b981",
    tip: "You're in great shape! Focus on staying active and eating balanced meals.",
    diet: {
      veg: [
        "🍳 2 eggs + oats with berries (breakfast)",
        "🥗 Quinoa + roasted vegetable bowl (lunch)",
        "🫘 Lentil soup + whole grain bread",
        "🍎 Greek yogurt + mixed fruit snack",
        "🌮 Vegetable tacos with black beans (dinner)",
        "🥦 Steamed broccoli + paneer stir-fry",
      ],
      nonveg: [
        "🍳 2 eggs + oats with berries (breakfast)",
        "🥗 Grilled chicken Caesar salad (lunch)",
        "🐟 Baked salmon + quinoa + asparagus (dinner)",
        "🦃 Turkey wrap with hummus & veggies",
        "🍤 Shrimp stir-fry with brown rice",
        "🥚 Hard-boiled eggs + almonds (snack)",
      ],
    },
    workout: [
      "🏃 30 min cardio (running/cycling) 3× per week",
      "💪 Strength training 3× per week (full body or split)",
      "🧘 Yoga or stretching 1× per week for flexibility",
      "🏊 Swimming or HIIT for cardio variety",
      "⚽ Include a sport or active hobby you enjoy",
      "🎯 Track progress monthly and adjust intensity",
    ],
  },
  overweight: {
    goal: "Fat Loss & Healthy Eating",
    color: "#f59e0b",
    tip: "Create a moderate caloric deficit of 300–500 kcal/day. Focus on whole foods and lean protein.",
    diet: {
      veg: [
        "🥗 Spinach & tomato egg-white omelet (breakfast)",
        "🍵 Green tea with oat bran (mid-morning)",
        "🥙 Chickpea salad with cucumber & lemon dressing",
        "🫑 Stuffed bell peppers with cauliflower rice (dinner)",
        "🥦 Large portion of steamed veggies with tofu",
        "🍎 Apple + handful of almonds (snack), avoid sugar",
      ],
      nonveg: [
        "🥗 Spinach & mushroom egg-white omelet (breakfast)",
        "🍗 Grilled chicken breast on large green salad (lunch)",
        "🐟 Baked cod + steamed asparagus (dinner)",
        "🦃 Turkey lettuce-wrap cups (low-carb snack)",
        "🍤 Grilled shrimp + zucchini noodles",
        "🥚 Boiled eggs + black coffee (morning boost)",
      ],
    },
    workout: [
      "🏃 45 min brisk walk or jog daily",
      "🔥 HIIT training 3× per week (20 min sessions)",
      "💪 Resistance/strength training 3× per week",
      "🚴 Cycling or elliptical for low-impact cardio",
      "📉 Avoid 2+ consecutive rest days",
      "💧 Drink 3–4 liters of water daily",
    ],
  },
  obese: {
    goal: "Medical Weight Loss & Safe Exercise",
    color: "#ef4444",
    tip: "Consult a doctor before starting. Begin low-impact exercise and reduce processed foods immediately.",
    diet: {
      veg: [
        "🥗 Large vegetable soup (low sodium) for lunch",
        "🥦 Steamed broccoli + cauliflower (unlimited veggies)",
        "🫘 Small portion of lentils + big mixed salad",
        "🍵 Herbal teas instead of sugary drinks",
        "🫑 Celery sticks + hummus (2 tbsp) as snack",
        "🚫 Eliminate all refined sugar, white bread, fried food",
      ],
      nonveg: [
        "🐟 Baked fish (5oz) + steamed green beans (lunch)",
        "🍗 Boiled chicken + large raw vegetable platter",
        "🥚 Egg-white omelet with spinach (breakfast)",
        "🍵 Herbal teas instead of sugary drinks",
        "🦐 Grilled shrimp + cucumber salad (low kcal dinner)",
        "🚫 Eliminate processed meats, fried foods, sugary drinks",
      ],
    },
    workout: [
      "🚶 Start with 20–30 min walking daily",
      "🏊 Swimming — excellent zero-impact full body workout",
      "🪑 Chair exercises & seated stretching to begin",
      "📈 Gradually increase intensity every 2 weeks",
      "🧘 Breathing exercises & light yoga",
      "👨‍⚕️ Work with a certified trainer or physiotherapist",
    ],
  },
};

const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return "underweight";
  if (bmi <= 24.9) return "healthy";
  if (bmi <= 29.9) return "overweight";
  return "obese";
};

const BmiCalculatorContent = () => {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  const [heightFeet, setHeightFeet] = useState<string>("");
  const [heightInches, setHeightInches] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("var(--accent-purple)");
  const [bmiCategory, setBmiCategory] = useState<BMICategory | null>(null);
  const [dietType, setDietType] = useState<DietType>("veg");

  const handleUnitToggle = (system: "metric" | "imperial") => {
    setUnitSystem(system);
    setBmi(null);
    setBmiCategory(null);
    setWeight(""); setHeightCm(""); setHeightFeet(""); setHeightInches("");
  };

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    let h = 0;
    if (unitSystem === "metric") {
      h = parseFloat(heightCm) / 100;
    } else {
      const feet = parseFloat(heightFeet);
      const inches = parseFloat(heightInches) || 0;
      if (!isNaN(feet)) h = ((feet * 12) + inches) * 0.0254;
    }
    if (w > 0 && h > 0) {
      const calc = w / (h * h);
      const rounded = parseFloat(calc.toFixed(1));
      setBmi(rounded);
      const cat = getBMICategory(rounded);
      setBmiCategory(cat);
      const labels: Record<BMICategory, [string, string]> = {
        underweight: ["Underweight", "#3b82f6"],
        healthy: ["Healthy Weight", "#10b981"],
        overweight: ["Overweight", "#f59e0b"],
        obese: ["Obese", "#ef4444"],
      };
      setCategory(labels[cat][0]);
      setCategoryColor(labels[cat][1]);
    }
  };

  const suggestion = bmiCategory ? suggestions[bmiCategory] : null;

  const inputStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <main className="dashboard-content">
      <div className="welcome-section">
        <h1 className="welcome-title">BMI Calculator</h1>
        <p className="welcome-subtitle">Calculate your BMI and get personalised diet & workout recommendations.</p>
      </div>

      {/* Top Row: Calculator + Result */}
      <div className="main-split" style={{ alignItems: 'start', marginBottom: '28px' }}>

        {/* Left: Input Form */}
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="card-title" style={{ margin: 0 }}>Calculate Your BMI</h2>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px' }}>
              {["metric", "imperial"].map((sys) => (
                <button key={sys} type="button" onClick={() => handleUnitToggle(sys as any)}
                  style={{ padding: '6px 14px', borderRadius: '6px', border: 'none',
                    backgroundColor: unitSystem === sys ? 'var(--accent-blue)' : 'transparent',
                    color: unitSystem === sys ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer', fontSize: '12px', fontWeight: '600', transition: 'all 0.2s'
                  }}>
                  {sys === "metric" ? "CM / KG" : "FT / KG"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={calculateBMI} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {unitSystem === "metric" ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Height (cm) <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g. 175" style={inputStyle} required />
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Feet <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="number" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} placeholder="e.g. 5" style={inputStyle} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Inches</label>
                  <input type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} placeholder="e.g. 8" style={inputStyle} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Weight (kg) <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" style={inputStyle} required />
            </div>

            {/* Diet Preference Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Diet Preference</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { id: "veg", label: "🥦 Vegetarian", color: "#10b981" },
                  { id: "nonveg", label: "🍗 Non-Vegetarian", color: "#f59e0b" },
                ].map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setDietType(opt.id as DietType)}
                    style={{
                      flex: 1, padding: '10px 12px', borderRadius: '10px', border: `2px solid`,
                      borderColor: dietType === opt.id ? opt.color : 'var(--border-color)',
                      backgroundColor: dietType === opt.id ? `${opt.color}18` : 'transparent',
                      color: dietType === opt.id ? opt.color : 'var(--text-muted)',
                      cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s'
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="upgrade-btn" style={{ marginTop: '6px' }}>
              Calculate BMI
            </button>
          </form>
        </div>

        {/* Right: Result Circle */}
        <div className="content-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px' }}>
          <h2 className="card-title" style={{ marginBottom: '24px' }}>Your Result</h2>
          {bmi !== null ? (
            <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'fadeInUp 0.5s ease-out forwards' }}>
              <div style={{
                width: '140px', height: '140px', borderRadius: '50%',
                background: `radial-gradient(circle, ${categoryColor}22, transparent)`,
                border: `5px solid ${categoryColor}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
              }}>
                <span style={{ fontSize: '38px', fontWeight: 'bold', color: categoryColor }}>{bmi}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>BMI Score</span>
              </div>
              <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: categoryColor }}>{category}</h3>
              {suggestion && (
                <div style={{ backgroundColor: `${categoryColor}18`, borderRadius: '12px', padding: '14px 18px', border: `1px solid ${categoryColor}40`, maxWidth: '90%' }}>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    🎯 <strong style={{ color: suggestion.color }}>Goal: {suggestion.goal}</strong>
                  </p>
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {suggestion.tip}
                  </p>
                </div>
              )}

              {/* BMI Scale */}
              <div style={{ width: '100%', marginTop: '8px' }}>
                <div style={{ height: '8px', borderRadius: '99px', background: 'linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444)', position: 'relative', overflow: 'visible' }}>
                  <div style={{
                    position: 'absolute',
                    left: `${Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100)}%`,
                    top: '-4px', width: '16px', height: '16px', borderRadius: '50%',
                    backgroundColor: categoryColor, border: '2px solid white', transform: 'translateX(-50%)',
                    transition: 'left 0.5s ease'
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  {['< 18.5', '18.5–24.9', '25–29.9', '30+'].map((label, i) => (
                    <span key={i} style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, marginBottom: '16px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={{ margin: 0, lineHeight: '1.6' }}>Enter your height and weight<br />to see your BMI result.</p>
            </div>
          )}
        </div>
      </div>

      {/* Suggestion Panel — only visible after calculation */}
      {suggestion && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', animation: 'fadeInUp 0.5s ease-out 0.15s both' }}>

          {/* Diet Suggestions */}
          <div className="content-card" style={{ borderTop: `4px solid ${suggestion.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${suggestion.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                {dietType === 'veg' ? '🥦' : '🍗'}
              </div>
              <div>
                <h2 className="card-title" style={{ margin: 0 }}>
                  {dietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Diet Plan
                </h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>Based on your BMI: {category}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {suggestion.diet[dietType].map((item, idx) => (
                <div key={idx} style={{
                  padding: '12px 14px', backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px', borderLeft: `3px solid ${suggestion.color}`,
                  fontSize: '14px', lineHeight: '1.5',
                  animation: `fadeInUp 0.35s ease-out forwards`, opacity: 0,
                  animationDelay: `${0.2 + idx * 0.07}s`, transition: 'transform 0.2s', cursor: 'default'
                }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Workout Suggestions */}
          <div className="content-card" style={{ borderTop: `4px solid ${suggestion.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${suggestion.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                🏋️
              </div>
              <div>
                <h2 className="card-title" style={{ margin: 0 }}>Workout Plan</h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>Based on your BMI: {category}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {suggestion.workout.map((item, idx) => (
                <div key={idx} style={{
                  padding: '12px 14px', backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px', borderLeft: `3px solid ${suggestion.color}`,
                  fontSize: '14px', lineHeight: '1.5',
                  animation: `fadeInUp 0.35s ease-out forwards`, opacity: 0,
                  animationDelay: `${0.2 + idx * 0.07}s`, transition: 'transform 0.2s', cursor: 'default'
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
      )}
    </main>
  );
};

export default BmiCalculatorContent;
