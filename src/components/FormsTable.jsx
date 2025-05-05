// src/components/FormsTable.jsx
import { useState } from "react";

const FormsTable = ({ forms }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(forms.length / formsPerPage);
  const startIndex = (currentPage - 1) * formsPerPage;
  const currentForms = forms.slice(startIndex, startIndex + formsPerPage);

  const handleClickForm = (formId) => {
    window.open(`/form/${formId}`, "_blank");
  };

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

  return (
    <div className="forms-table">
      {/* Pagination Controls */}
      {currentForms.length > 0 && (
        <>
          <div className="pagination">
            <div className="buttons">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>

            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Form ID</th>
                <th>Patient ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Score</th>
                <th>Assessment</th>
              </tr>
            </thead>
            <tbody>
              {currentForms.map((form) => (
                <tr key={form.formId}>
                  <td>
                    <button
                      onClick={() => handleClickForm(form.formId)}
                      className="form-link"
                    >
                      {form.formId}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        window.open(
                          `/patient/${form.patient.identifier}`,
                          "_blank"
                        )
                      }
                      className="form-link"
                    >
                      {form.patient.identifier}
                    </button>
                  </td>
                  <td>{form.type}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        form.submitted ? "completed" : "pending"
                      }`}
                    >
                      {form.submitted ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td>{form.score}</td>
                  <td>{form.submitted ? getAssessment(form.score, form.type): ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {currentForms.length === 0 && (
        <p className="no-data">No forms avaialble</p>
      )}
    </div>
  );
};

export default FormsTable;
