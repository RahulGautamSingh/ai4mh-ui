import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormsTable from "../../components/FormsTable";
import PatientsTable from "../../components/PatientsTable";
import "./index.css";
import axios from "../../axiosInstance.js";
import FormModal from "../../components/FormModal";
import PatientModal from "../../components/PatientModal";
import PatientDetail from "../../components/PatientDetail";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("forms"); // default to 'forms'
  const [forms, setForms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreatePatient, setShowCreatePatient] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleLogout = () => {
    // Remove token from localStorage and redirect to login page
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "/api/doctor/profile"
        );
        const data = response.data;
        setForms(data.forms || []);
        setPatients(data.patients || []);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePatientsClick = () => {
    setActiveTab("patients");
    setSelectedPatientId(null); // reset if switching tabs
  };
  const handleFormsClick = () => setActiveTab("forms");

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Doctor Dashboard</h2>
        </div>
        <div className="navbar-center">
          <button
            className={`navbar-btn ${activeTab === "patients" ? "active" : ""}`}
            onClick={handlePatientsClick}
          >
            Patients
          </button>
          <button
            className={`navbar-btn ${activeTab === "forms" ? "active" : ""}`}
            onClick={handleFormsClick}
          >
            Forms
          </button>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Conditional Content */}
      <div className="dashboard-content">
        {loading ? (
          <p>Loading...</p>
        ) : activeTab === "forms" ? (
          <FormsTable forms={forms} />
        ) : selectedPatientId ? (
          <PatientDetail
            patientId={selectedPatientId}
            onBack={() => setSelectedPatientId(null)}
          />
        ) : (
          <PatientsTable
            patients={patients}
            onPatientClick={(id) => setSelectedPatientId(id)}
          />
        )}

        {/* Floating create button */}
        {activeTab === "forms" && (
          <button
            className="floating-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Form
          </button>
        )}

        {activeTab === "patients" && (
          <button
            className="floating-btn"
            onClick={() => setShowCreatePatient(true)}
          >
            + Create Patient
          </button>
        )}

        {showCreateModal && (
          <FormModal
            onClose={() => setShowCreateModal(false)}
            addForm={(newForm) => setForms((prev) => [...prev, newForm])}
          />
        )}
        {showCreatePatient && (
          <PatientModal
            onClose={() => setShowCreatePatient(false)}
            addPatient={(newPatient) =>
              setPatients((prev) => [...prev, newPatient])
            }
          />
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
