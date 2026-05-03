import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate, Outlet } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(() => localStorage.getItem("userAvatar") || "/avatars/avatar_man_1.png");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("userAvatar", userAvatar);
  }, [userAvatar]);

  useEffect(() => {
    // Check missing auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
    navigate("/");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const userName = user?.displayName ? user.displayName.split(' ')[0] : "User";
  const userId = user?.uid || null;
  const userEmail = user?.email || "";

  return (
    <div className="dashboard-layout">
      {/* Global WhatsApp Float */}
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-float" title="Chat with us on WhatsApp">
        <svg fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
          <path d="M12.01 2C6.47 2 2 6.47 2 12.01c0 1.76.46 3.42 1.25 4.87L2 22l5.31-1.22A9.97 9.97 0 0012.01 22c5.52 0 10-4.48 10-10C22.01 6.47 17.53 2 12.01 2zm5.72 13.91c-.26.74-1.52 1.4-2.12 1.47-.52.06-1.18.17-3.41-.75-2.69-1.11-4.43-3.85-4.57-4.04-.13-.19-1.09-1.45-1.09-2.77s.69-1.95.94-2.22c.24-.26.54-.33.72-.33.19 0 .37.01.53.02.19.01.44-.07.67.5.24.58.82 2 .89 2.14.07.14.12.31.02.49-.09.19-.14.3-.29.47-.14.17-.3.37-.43.51-.15.15-.31.31-.13.62.17.31.78 1.3 1.68 2.11 1.15 1.05 2.13 1.37 2.45 1.51.31.14.5.12.68-.08.19-.21.84-1.01 1.07-1.34.22-.33.45-.27.72-.17.28.1 1.73.82 2.03.97.29.14.49.22.56.35.07.12.07.74-.19 1.48z" />
        </svg>
      </a>

      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="main-wrapper">
        <Header handleLogout={handleLogout} toggleSidebar={toggleSidebar} userAvatar={userAvatar} />
        {/* Pass down context */}
        <Outlet context={{ userName, userId, userEmail, userAvatar, setUserAvatar }} />
      </div>
    </div>
  );
};

export default Home;
