import { HashRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/landing/LandingPage";
import Home from "./components/home/Home";
import DashboardContent from "./components/home/DashboardContent";
import ProfileContent from "./components/home/ProfileContent";
import DietPlanContent from "./components/home/DietPlanContent";
import WorkoutPlanContent from "./components/home/WorkoutPlanContent";
import BmiCalculatorContent from "./components/home/BmiCalculatorContent";
import ProPlanContent from "./components/home/ProPlanContent";
import ContactContent from "./components/home/ContactContent";
import GoalsContent from "./components/home/GoalsContent";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<DashboardContent />} />
          <Route path="profile" element={<ProfileContent />} />
          <Route path="diet-plan" element={<DietPlanContent />} />
          <Route path="workout-plan" element={<WorkoutPlanContent />} />
          <Route path="bmi-calculator" element={<BmiCalculatorContent />} />
          <Route path="pro-plan" element={<ProPlanContent />} />
          <Route path="contact" element={<ContactContent />} />
          <Route path="goals" element={<GoalsContent />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
