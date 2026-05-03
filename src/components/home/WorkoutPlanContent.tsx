import { useState } from "react";
import "./Dashboard.css";

const WorkoutPlanContent = () => {
  const [activeCategory, setActiveCategory] = useState<"build_muscle" | "just_fit" | "weight_loss">("build_muscle");

  const categories = [
    { id: "build_muscle", label: "💪 Build Muscle" },
    { id: "just_fit", label: "🏃 Just Fit" },
    { id: "weight_loss", label: "🔥 Weight Loss" }
  ];

  const workoutPlans = {
    build_muscle: [
      {
        day: "Monday",
        title: "Heavy Push",
        duration: "60 mins",
        type: "Hypertrophy",
        exercises: ["Barbell Bench Press: 4x8", "Overhead Press: 4x8", "Incline Dumbbell Press: 3x10", "Tricep Pushdowns: 3x12"],
        color: "var(--accent-blue)"
      },
      {
        day: "Tuesday",
        title: "Heavy Pull",
        duration: "55 mins",
        type: "Hypertrophy",
        exercises: ["Barbell Rows: 4x8", "Pull-ups: 4xFailure", "Lat Pulldowns: 3x10", "Barbell Curls: 3x10"],
        color: "var(--accent-purple)"
      },
      {
        day: "Wednesday",
        title: "Active Recovery",
        duration: "30 mins",
        type: "Mobility",
        exercises: ["Light Elliptical: 15 mins", "Foam Rolling: 10 mins", "Dynamic Stretching: 5 mins"],
        color: "var(--text-muted)"
      },
      {
        day: "Thursday",
        title: "Leg Day Demolition",
        duration: "65 mins",
        type: "Strength",
        exercises: ["Heavy Squats: 4x6", "Romanian Deadlifts: 3x8", "Leg Press: 3x10", "Calf Raises: 4x15"],
        color: "var(--accent-blue)"
      },
      {
        day: "Friday",
        title: "Arm & Shoulder Pumping",
        duration: "45 mins",
        type: "Hypertrophy",
        exercises: ["Lateral Raises: 4x12", "Skull Crushers: 3x10", "Hammer Curls: 3x10", "Face Pulls: 3x15"],
        color: "var(--accent-purple)"
      },
      {
        day: "Saturday",
        title: "Weak Point Focus",
        duration: "40 mins",
        type: "Isolation",
        exercises: ["Rear Delt Flyes: 3x15", "Seated Calf Raises: 3x15", "Shrugs: 3x15", "Forearm Curls: 3x15"],
        color: "var(--accent-blue)"
      },
      {
        day: "Sunday",
        title: "Couch Potato Protocols",
        duration: "24 hrs",
        type: "Extreme Rest",
        exercises: ["Avoid all heavy lifting, including groceries 🛍️", "Unrelenting Netflix Marathon 📺", "Think about the gym, but don't actually go 🤔"],
        color: "var(--text-muted)"
      }
    ],
    just_fit: [
      {
        day: "Monday",
        title: "Full Body Circuit",
        duration: "45 mins",
        type: "Endurance",
        exercises: ["Kettlebell Swings: 3x15", "Push-ups: 3x20", "Goblet Squats: 3x15", "Plank: 3x60s"],
        color: "var(--accent-green)"
      },
      {
        day: "Tuesday",
        title: "Yoga Flow",
        duration: "35 mins",
        type: "Flexibility",
        exercises: ["Sun Salutations: 10 mins", "Warrior Poses: 10 mins", "Balance Sequences: 10 mins", "Savasana: 5 mins"],
        color: "var(--accent-purple)"
      },
      {
        day: "Wednesday",
        title: "Active Cardio",
        duration: "30 mins",
        type: "Cardio",
        exercises: ["Jump Rope: 10 mins", "Rowing Machine: 10 mins", "Light Jogging: 10 mins"],
        color: "var(--accent-blue)"
      },
      {
        day: "Thursday",
        title: "Core & Stability",
        duration: "40 mins",
        type: "Flexibility",
        exercises: ["Russian Twists: 3x20", "Leg Raises: 3x15", "Dynamic Stretching: 15 mins", "Bird Dogs: 3x12"],
        color: "var(--text-muted)"
      },
      {
        day: "Friday",
        title: "Strength Basics",
        duration: "45 mins",
        type: "Strength",
        exercises: ["Dumbbell Bench Press: 3x12", "Dumbbell Rows: 3x12", "Lunges: 3x12 (each)", "Shoulder Press: 3x12"],
        color: "var(--accent-green)"
      },
      {
        day: "Saturday",
        title: "Outdoor Steady Pace",
        duration: "60 mins",
        type: "Cardio",
        exercises: ["Biking / Swimming / Hiking: 60 minutes moderate intensity"],
        color: "var(--accent-blue)"
      },
      {
        day: "Sunday",
        title: "Gravity Testing",
        duration: "All Day",
        type: "Do Absolutely Nothing",
        exercises: ["Horizontal Couch Planks: 5 hours 🛋️", "Frequent Fridge Walks (hydration only) 🚶", "Staring into the void 🌌"],
        color: "var(--text-muted)"
      }
    ],
    weight_loss: [
      {
        day: "Monday",
        title: "HIIT Shred",
        duration: "30 mins",
        type: "HIIT",
        exercises: ["Jump Squats: 4x20s", "Mountain Climbers: 4x20s", "Burpees: 4x20s", "High Knees: 4x20s"],
        color: "#ef4444" // Red
      },
      {
        day: "Tuesday",
        title: "LISS Cardio",
        duration: "45 mins",
        type: "Cardio",
        exercises: ["Incline Treadmill Walk: 30 mins", "Stationary Bike: 15 mins"],
        color: "#f59e0b" // Orange
      },
      {
        day: "Wednesday",
        title: "Full Body Sweat",
        duration: "40 mins",
        type: "Circuit",
        exercises: ["Thrusters: 3x15", "Renegade Rows: 3x12", "Box Jumps: 3x15", "Bear Crawls: 3x20m"],
        color: "#ef4444"
      },
      {
        day: "Thursday",
        title: "Fat Burn Intervals",
        duration: "40 mins",
        type: "Metabolic",
        exercises: ["Jumping Jacks: 3x50", "Battle Ropes: 4x30s", "Sprint Intervals: 10 mins", "Sled Pushes: 3x20m"],
        color: "#ef4444"
      },
      {
        day: "Friday",
        title: "Cardio Boxing",
        duration: "35 mins",
        type: "HIIT",
        exercises: ["Shadowboxing / Heavy Bag: 3 min rounds x 5", "Speed Rope: 5 mins", "Core Blaster: 5 mins"],
        color: "#f59e0b"
      },
      {
        day: "Saturday",
        title: "Active Recovery",
        duration: "60 mins",
        type: "Activity",
        exercises: ["Brisk Outdoor Walk: 45 mins", "Light Stretching: 15 mins"],
        color: "var(--accent-green)"
      },
      {
        day: "Sunday",
        title: "Strategic Laziness",
        duration: "Zero Effort",
        type: "Recovery",
        exercises: ["Meal prep while wearing pajamas 🍳", "Dodging any and all responsibilities 🏃‍♂️💨", "Mentally preparing for Monday 🧠"],
        color: "var(--text-muted)"
      }
    ]
  };

  const currentlyDisplayedWorkouts = workoutPlans[activeCategory];

  return (
    <main className="dashboard-content">
      <div className="welcome-section" style={{ marginBottom: '24px' }}>
        <h1 className="welcome-title">Workout Plan</h1>
        <p className="welcome-subtitle">Select your primary fitness goal below to get a specialized weekly routine.</p>
      </div>

      {/* Goal Selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', backgroundColor: 'var(--bg-card)', padding: '8px', borderRadius: '12px', width: 'fit-content' }}>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeCategory === cat.id ? 'var(--accent-blue)' : 'transparent',
              color: activeCategory === cat.id ? 'white' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Routine Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {currentlyDisplayedWorkouts.map((workout, index) => (
          <div key={index} className="content-card" style={{ display: 'flex', flexDirection: 'column', borderTop: `4px solid ${workout.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: workout.color }}>{workout.day}</span>
              <span style={{ fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '12px', color: 'var(--text-muted)' }}>
                {workout.duration}
              </span>
            </div>
            
            <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>{workout.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>{workout.type}</p>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '4px', color: 'var(--text-muted)' }}>Exercises</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {workout.exercises.map((exercise, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      fontSize: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      padding: '10px 12px', 
                      backgroundColor: 'rgba(0,0,0,0.2)', 
                      borderRadius: '10px', 
                      borderLeft: `3px solid ${workout.color}`,
                      animation: `fadeInUp 0.4s ease-out forwards`,
                      opacity: 0,
                      animationDelay: `${idx * 0.08}s`,
                      transition: 'transform 0.2s',
                      cursor: 'default'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={workout.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ lineHeight: '1.4' }}>{exercise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default WorkoutPlanContent;
