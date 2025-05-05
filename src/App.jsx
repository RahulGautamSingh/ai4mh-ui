import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDetails from "./pages/PatientDetails";
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
        <Route path="/patient/:patientId" element={<PatientDetails />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
