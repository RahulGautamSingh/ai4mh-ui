import { useEffect, useState } from "react";
import axios from "../axiosInstance.js";
import "./PatientDetail.css";

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`/api/patient/${patientId}`);
        setPatient(res.data);
        setForms(res.data.forms || []);
      } catch (err) {
        console.error("Failed to load patient details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  function getAssessment(score, formType) {
    if (formType === "PHQ") {
      if (score < 5) return "Minimal";
      if (score < 10) return "Mild";
      if (score < 15) return "Moderate";
      if (score < 20) return "Moderately Severe";
      return "Severe";
    } else {
      if (score < 7) return "Normal";
      if (score < 20) return "Mild";
      if (score < 31) return "Moderate";
      if (score < 40) return "Moderately Severe";
      return "Severe";
    }
  }

  if (loading) return <p>Loading patient details...</p>;
  if (!patient) return <p>Patient not found.</p>;

  return (
    <div className="patient-detail-container">
      <div className="left">
        <button className="back-btn" onClick={onBack}>
          Back to Patients
        </button>

        <table class="flipped-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{patient.name}</td>
            </tr>
            <tr>
              <th>ID</th>
              <td>{patient.identifier}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="right">
        <h3>Assessment History</h3>
        <div className="assessment-history">
          {forms.length === 0 ? (
            <p>No forms found.</p>
          ) : (
            forms
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((form) => (
                <div
                  key={form.id}
                  className="assessment-card"
                  onClick={() => {
                    window.open(`/form/${form.formId}`, "_blank");
                  }}
                >
                  <p className="assessment-line">
                    <p>
                      <strong>Type:</strong>{" "}
                    </p>
                    <p>{form.type}</p>
                  </p>
                  <p className="assessment-line">
                    <p>
                      <strong>Doctor:</strong>{" "}
                    </p>
                    <p>{form.doctor.name}</p>
                  </p>
                  {form.submitted && (
                    <p className="assessment-line">
                      <p>
                        <strong>Score:</strong>{" "}
                      </p>
                      <p>{form.score}</p>
                    </p>
                  )}
                  {form.submitted && (
                    <p className="assessment-line">
                      <p>
                        <strong>Assessment:</strong>{" "}
                      </p>
                      <p>{getAssessment(form.score, form.type)}</p>
                    </p>
                  )}

                  <p className="assessment-line">
                    <p>
                      <strong>Created On:</strong>{" "}
                    </p>
                    <p>{new Date(form.createdAt).toLocaleDateString()}</p>
                  </p>

                  <p className="status-pill-absolute">
                    <span
                      className={`status-pill ${
                        form.submitted ? "completed" : "pending"
                      }`}
                      style={{
                        padding: 0,
                        fontSize: "13px",
                      }}
                    >
                      {form.submitted ? "Completed" : "Pending"}
                    </span>
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
