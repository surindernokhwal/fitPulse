/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { auth, googleProvider } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

// ───── SVG Icon Components ─────
const HeartPulseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);

const DumbbellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6.5 6.5 11 11" /><path d="m21 21-1-1" /><path d="m3 3 1 1" /><path d="m18 22 4-4" /><path d="m2 6 4-4" /><path d="m3 10 7-7" /><path d="m14 21 7-7" />
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BoltIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ───── 3D Wireframe Cube Component ─────
const WireframeCube = ({ size, color, blur, style, refObj }: any) => {
  const half = size / 2;
  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: `${color}10`,
    border: `1px solid ${color}60`,
    boxShadow: `0 0 ${blur}px ${color}30, inset 0 0 ${blur}px ${color}30`,
    backdropFilter: 'blur(2px)',
  };

  return (
    <div style={{ perspective: '1200px', width: size, height: size, zIndex: 1, pointerEvents: 'none', ...style }}>
      <div ref={refObj} style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)' }}>
        <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </div>
    </div>
  );
};

// ───── Landing Page Component ─────
const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Scroll-reveal refs
  const revealRefs = useRef<HTMLElement[]>([]);

  // Mouse effect refs
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cube1Ref = useRef<HTMLDivElement>(null);
  const cube2Ref = useRef<HTMLDivElement>(null);
  const cube3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
      
      if (gridRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        const dist = Math.sqrt(x*x + y*y);
        const scaleHover = 1.05 + (1 - Math.min(dist, 1)) * 0.1; // Zoom in near center
        
        gridRef.current.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(${scaleHover}) translateZ(${Math.abs(x*y)*30}px)`;
        
        if (cube1Ref.current) {
          // Large cube rotates drastically based on mouse
          cube1Ref.current.style.transform = `rotateX(${y * -180 + 30}deg) rotateY(${x * 180 + 45}deg) translateZ(${dist * -50}px)`;
        }
        if (cube2Ref.current) {
          // Small cube spins the opposite way
          cube2Ref.current.style.transform = `rotateX(${y * 120 + 15}deg) rotateY(${x * -120 + 20}deg) translateZ(${dist * 30}px)`;
        }
        if (cube3Ref.current) {
          // Purple cube spins on Z and X
          cube3Ref.current.style.transform = `rotateZ(${x * 90}deg) rotateX(${y * 90 + 45}deg) translateZ(${dist * -20}px)`;
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const currentRefs = revealRefs.current;
    currentRefs.forEach((el) => el && observer.observe(el));
    return () => currentRefs.forEach((el) => el && observer.unobserve(el));
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Smooth scroll to section
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ───── Auth Handlers ─────
  const resetAuthForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAuthError("");
  };

  const openModal = (mode: "login" | "register") => {
    resetAuthForm();
    setAuthModal(mode);
  };

  const closeModal = () => {
    setAuthModal(null);
    resetAuthForm();
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      console.error("Login error:", err.message);
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });
      navigate("/home");
    } catch (err: any) {
      console.error("Signup error:", err.message);
      setAuthError("Sign up failed. Please check your details.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err: any) {
      console.error("Google auth error:", err.message);
      setAuthError("Google sign-in failed. Try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authModal === "login" ? handleLogin() : handleRegister();
  };

  // ───── Render ─────
  return (
    <div className="landing-page">
      {/* Mouse Glow Effect */}
      <div 
        ref={glowRef}
        style={{
          position: 'fixed',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          mixBlendMode: 'screen',
          top: '-1000px',
          left: '-1000px'
        }}
      />

      {/* Background Effects */}
      <div className="landing-bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        
        {/* Interactive 3D Cubes */}
        <WireframeCube refObj={cube1Ref} size={140} color="#3b82f6" blur={20} style={{ position: 'absolute', top: '25%', right: '15%' }} />
        <WireframeCube refObj={cube2Ref} size={80} color="#10b981" blur={15} style={{ position: 'absolute', bottom: '20%', left: '10%' }} />
        <WireframeCube refObj={cube3Ref} size={100} color="#8b5cf6" blur={25} style={{ position: 'absolute', top: '15%', left: '25%' }} />
      </div>
      <div 
        className="bg-grid" 
        ref={gridRef}
        style={{
          inset: '-30%',
          transformOrigin: 'center center',
          transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)'
        }}
      />

      {/* ───── NAVBAR ───── */}
      <nav className={`lp-navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="lp-nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="lp-nav-logo-icon">
            <BoltIcon />
          </div>
          FitPulse
        </a>

        <div className="lp-nav-links">
          <button className="lp-nav-link" onClick={() => scrollTo("features")}>Features</button>
          <button className="lp-nav-link" onClick={() => scrollTo("about")}>How It Works</button>
          <button className="lp-nav-link" onClick={() => scrollTo("pricing")}>Pricing</button>
        </div>

        <div className="lp-nav-actions">
          <button className="lp-btn lp-btn-ghost" id="nav-login-btn" onClick={() => openModal("login")}>Log In</button>
          <button className="lp-btn lp-btn-primary" id="nav-signup-btn" onClick={() => openModal("register")}>
            Get Started
          </button>
          <button className="lp-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ───── MOBILE MENU DROPDOWN ───── */}
      {mobileMenuOpen && (
        <div className="lp-mobile-menu" onClick={() => setMobileMenuOpen(false)}>
          <button className="lp-mobile-nav-link" onClick={() => scrollTo("features")}>Features</button>
          <button className="lp-mobile-nav-link" onClick={() => scrollTo("about")}>How It Works</button>
          <button className="lp-mobile-nav-link" onClick={() => scrollTo("pricing")}>Pricing</button>
          <div className="lp-mobile-menu-divider" />
          <button className="lp-mobile-nav-auth lp-btn-ghost" onClick={() => { setMobileMenuOpen(false); openModal("login"); }}>Log In</button>
          <button className="lp-mobile-nav-auth lp-btn-primary" onClick={() => { setMobileMenuOpen(false); openModal("register"); }}>Get Started</button>
        </div>
      )}

      {/* ───── HERO ───── */}
      <section className="lp-hero" id="hero">
        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <span className="lp-hero-badge-dot" />
            Your Fitness Journey Starts Here
          </div>

          <h1 className="lp-hero-title">
            Transform Your Body.<br />
            <span className="lp-hero-title-gradient">Elevate Your Life.</span>
          </h1>

          <p className="lp-hero-subtitle">
            Track workouts, plan meals, monitor progress, and crush your fitness goals with FitPulse — the all-in-one dashboard built for results.
          </p>

          <div className="lp-hero-actions">
            <button className="lp-btn lp-btn-primary lp-btn-large" id="hero-cta-btn" onClick={() => openModal("register")}>
              Start Free Today
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button className="lp-btn-outline-large" onClick={() => scrollTo("features")}>
              Explore Features
            </button>
          </div>

          <div className="lp-hero-stats-row">
            <div className="lp-hero-stat">
              <div className="lp-hero-stat-value">10K+</div>
              <div className="lp-hero-stat-label">Active Users</div>
            </div>
            <div className="lp-hero-stat">
              <div className="lp-hero-stat-value">500+</div>
              <div className="lp-hero-stat-label">Workout Plans</div>
            </div>
            <div className="lp-hero-stat">
              <div className="lp-hero-stat-value">98%</div>
              <div className="lp-hero-stat-label">Goal Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SHOWCASE ───── */}
      <section className="lp-showcase" ref={addRevealRef}>
        <div className="lp-section-container lp-reveal" ref={addRevealRef}>
          <div className="lp-section-header">
            <span className="lp-section-label">Experience</span>
            <h2 className="lp-section-title">Your Fitness, Visualized</h2>
            <p className="lp-section-desc">
              Data-driven insights to keep you motivated and on track with a beautiful, intuitive interface.
            </p>
          </div>
          <div className="lp-showcase-preview">
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
              alt="Dashboard Preview" 
            />
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="lp-features" id="features" ref={addRevealRef}>
        <div className="lp-section-container lp-reveal" ref={addRevealRef}>
          <div className="lp-section-header">
            <span className="lp-section-label">Features</span>
            <h2 className="lp-section-title">Everything You Need to Win</h2>
            <p className="lp-section-desc">
              Powerful tools designed to help you build healthy habits, stay consistent, and see real results.
            </p>
          </div>

          <div className="lp-features-grid">
            <div className="lp-feature-card">
              <div className="lp-feature-icon blue"><DumbbellIcon /></div>
              <h3 className="lp-feature-title">Workout Tracking</h3>
              <p className="lp-feature-desc">Log exercises, sets, and reps with intelligent tracking that adapts to your progress.</p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon green"><AppleIcon /></div>
              <h3 className="lp-feature-title">Diet Plans</h3>
              <p className="lp-feature-desc">Customized veg & non-veg meal plans with macros, calories, and nutritional breakdowns.</p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon purple"><HeartPulseIcon /></div>
              <h3 className="lp-feature-title">BMI Calculator</h3>
              <p className="lp-feature-desc">Instantly calculate your BMI and get personalized diet and workout suggestions.</p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon orange"><TargetIcon /></div>
              <h3 className="lp-feature-title">Goal Setting</h3>
              <p className="lp-feature-desc">Set specific goals, track your duration, and follow a structured fitness roadmap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="lp-about" id="about">
        <div className="lp-section-container lp-reveal" ref={addRevealRef}>
          <div className="lp-section-header">
            <span className="lp-section-label">How It Works</span>
            <h2 className="lp-section-title">Three Steps. Real Results.</h2>
            <p className="lp-section-desc">
              Getting started is simple. No complicated setup, no confusing plans.
            </p>
          </div>

          <div className="lp-steps-grid">
            <div className="lp-step-card">
              <div className="lp-step-number">1</div>
              <h3 className="lp-step-title">Create Your Profile</h3>
              <p className="lp-step-desc">Sign up in seconds and tell us about your fitness level, goals, and preferences.</p>
            </div>
            <div className="lp-step-card">
              <div className="lp-step-number">2</div>
              <h3 className="lp-step-title">Get Your Plan</h3>
              <p className="lp-step-desc">Receive personalized workout routines and diet plans tailored just for you.</p>
            </div>
            <div className="lp-step-card">
              <div className="lp-step-number">3</div>
              <h3 className="lp-step-title">Crush Your Goals</h3>
              <p className="lp-step-desc">Track progress with beautiful dashboards and stay motivated every single day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section className="lp-pricing" id="pricing">
        <div className="lp-section-container lp-reveal" ref={addRevealRef}>
          <div className="lp-section-header">
            <span className="lp-section-label">Pricing</span>
            <h2 className="lp-section-title">Simple, Transparent Pricing</h2>
            <p className="lp-section-desc">
              Start free and upgrade when you're ready. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="lp-pricing-grid">
            {/* Free Plan */}
            <div className="lp-pricing-card">
              <h3 className="lp-pricing-name">Basic</h3>
              <div className="lp-pricing-price">₹0 <span>/month</span></div>
              <p className="lp-pricing-desc">Perfect for getting started</p>
              <ul className="lp-pricing-features">
                <li><CheckIcon /> BMI Calculator</li>
                <li><CheckIcon /> Weekly Workout Plan</li>
                <li><CheckIcon /> Generic Diet Templates</li>
                <li><CheckIcon /> Basic Tracking</li>
              </ul>
              <button className="lp-pricing-btn outline" onClick={() => openModal("register")}>
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="lp-pricing-card featured">
              <div className="lp-pricing-popular">Most Popular</div>
              <h3 className="lp-pricing-name">Pro</h3>
              <div className="lp-pricing-price">₹699 <span>/month</span></div>
              <p className="lp-pricing-desc">For serious fitness enthusiasts</p>
              <ul className="lp-pricing-features">
                <li><CheckIcon /> BMI History & Cloud Sync</li>
                <li><CheckIcon /> Personal Workout Generator</li>
                <li><CheckIcon /> Interactive Analytics</li>
                <li><CheckIcon /> Macro Tracking</li>
              </ul>
              <button className="lp-pricing-btn primary" onClick={() => openModal("register")}>
                Start Pro Trial
              </button>
            </div>

            {/* Elite Plan */}
            <div className="lp-pricing-card">
              <h3 className="lp-pricing-name">Elite</h3>
              <div className="lp-pricing-price">₹1499 <span>/month</span></div>
              <p className="lp-pricing-desc">The ultimate fitness experience</p>
              <ul className="lp-pricing-features">
                <li><CheckIcon /> Everything in Pro</li>
                <li><CheckIcon /> 1-on-1 AI Coaching</li>
                <li><CheckIcon /> Progress Photo Timeline</li>
                <li><CheckIcon /> Real-time Form Correction</li>
              </ul>
              <button className="lp-pricing-btn outline" onClick={() => openModal("register")}>
                Get Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="lp-testimonials" id="testimonials" ref={addRevealRef}>
        <div className="lp-section-container lp-reveal" ref={addRevealRef}>
          <div className="lp-section-header">
            <span className="lp-section-label">Success Stories</span>
            <h2 className="lp-section-title">Loved by Thousands</h2>
            <p className="lp-section-desc">Join the community of health enthusiasts who have transformed their lives with FitPulse.</p>
          </div>
          <div className="lp-testimonials-grid">
            <div className="lp-testimonial-card">
              <p className="lp-testimonial-quote">"FitPulse changed my life. The AI coach is like having a personal trainer in my pocket at all times!"</p>
              <div className="lp-testimonial-author">
                <div className="lp-author-avatar">RS</div>
                <div className="lp-author-info">
                  <h4>Rahul Sharma</h4>
                  <p>Lost 12kg in 3 months</p>
                </div>
              </div>
            </div>
            <div className="lp-testimonial-card">
              <p className="lp-testimonial-quote">"The meal plans are so easy to follow and customized. I finally understand my nutrition!"</p>
              <div className="lp-testimonial-author">
                <div className="lp-author-avatar">PK</div>
                <div className="lp-author-info">
                  <h4>Priya Kapoor</h4>
                  <p>Fitness Enthusiast</p>
                </div>
              </div>
            </div>
            <div className="lp-testimonial-card">
              <p className="lp-testimonial-quote">"The most intuitive health dashboard I've ever used. The tracking is seamless."</p>
              <div className="lp-testimonial-author">
                <div className="lp-author-avatar">AV</div>
                <div className="lp-author-info">
                  <h4>Ankit Verma</h4>
                  <p>Marathon Runner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="lp-faq" id="faq" ref={addRevealRef}>
        <div className="lp-section-container lp-reveal" ref={addRevealRef}>
          <div className="lp-section-header">
            <span className="lp-section-label">FAQ</span>
            <h2 className="lp-section-title">Common Questions</h2>
          </div>
          <div className="lp-faq-container">
            <div className="lp-faq-item">
              <button className="lp-faq-question">
                Is FitPulse free to use?
                <BoltIcon />
              </button>
              <div className="lp-faq-answer">
                Yes! We offer a completely free Basic plan that includes our core features like the BMI Calculator and basic workout plans.
              </div>
            </div>
            <div className="lp-faq-item">
              <button className="lp-faq-question">
                Can I cancel my Pro subscription?
                <BoltIcon />
              </button>
              <div className="lp-faq-answer">
                Absolutely. You can cancel your subscription at any time from your profile settings. No questions asked.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="lp-cta-final" ref={addRevealRef}>
        <div className="lp-cta-box lp-reveal" ref={addRevealRef}>
          <h2 className="lp-cta-title">Ready to Start Your Journey?</h2>
          <p className="lp-cta-desc">Join FitPulse today and take the first step towards a healthier, stronger you.</p>
          <button className="lp-btn lp-btn-primary lp-btn-large" onClick={() => openModal("register")}>
            Join Now for Free
          </button>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-logo">
            <div className="lp-nav-logo-icon" style={{ width: 28, height: 28 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            FitPulse
          </div>
          <p className="lp-footer-text">© 2026 FitPulse. All rights reserved.</p>
          <div className="lp-footer-links">
            <button className="lp-footer-link" onClick={() => scrollTo("features")}>Features</button>
            <button className="lp-footer-link" onClick={() => scrollTo("pricing")}>Pricing</button>
            <button className="lp-footer-link" onClick={() => openModal("login")}>Login</button>
          </div>
        </div>
      </footer>

      {/* ───── AUTH MODAL ───── */}
      {authModal && (
        <div className="lp-modal-overlay" onClick={closeModal}>
          <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={closeModal} aria-label="Close">
              <CloseIcon />
            </button>

            <h2 className="lp-modal-title">
              {authModal === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="lp-modal-subtitle">
              {authModal === "login"
                ? "Log in to access your dashboard"
                : "Start your fitness journey today"}
            </p>

            <form onSubmit={handleSubmit}>
              {authModal === "register" && (
                <div className="lp-form-group">
                  <label className="lp-form-label" htmlFor="auth-name">Full Name</label>
                  <input
                    id="auth-name"
                    className="lp-form-input"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="auth-email">Email Address</label>
                <input
                  id="auth-email"
                  className="lp-form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  className="lp-form-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="lp-form-submit" id="auth-submit-btn">
                {authModal === "login" ? "Log In" : "Create Account"}
              </button>

              {authError && <p className="lp-form-error">{authError}</p>}
            </form>

            <div className="lp-form-divider">or continue with</div>

            <button className="lp-google-btn" onClick={handleGoogleAuth} type="button" id="google-auth-btn">
              <GoogleIcon />
              Google
            </button>

            <div className="lp-form-switch">
              {authModal === "login" ? (
                <>
                  Don't have an account?
                  <button onClick={() => { resetAuthForm(); setAuthModal("register"); }}>Sign Up</button>
                </>
              ) : (
                <>
                  Already have an account?
                  <button onClick={() => { resetAuthForm(); setAuthModal("login"); }}>Log In</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
