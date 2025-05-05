import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import AuthPage from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/form/:formId" element={<FormPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
