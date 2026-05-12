import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ForgotPasswordPage from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import SimulationPage from "./pages/Simulation";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
