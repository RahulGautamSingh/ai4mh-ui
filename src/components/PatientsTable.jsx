import { useState } from "react";
import "./PatientsTable.css";

const PatientsTable = ({ patients, onPatientClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  const totalPages = Math.ceil(patients.length / patientsPerPage);
  const paginatedPatients = patients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );

  return (
    <div className="patients-container">
      {paginatedPatients.length > 0 && (
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

          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan="3" className="no-data">
                    No patients found
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td
                      className="link"
                      onClick={() => onPatientClick(patient.identifier)}
                    >
                      {patient.identifier}
                    </td>
                    <td>{patient.name}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => onPatientClick(patient.identifier)}
                      >
                        View Forms
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
      {paginatedPatients.length === 0 && (
        <p className="no-data">No patients found</p>
      )}
    </div>
  );
};

export default PatientsTable;
