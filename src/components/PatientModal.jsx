import { useState, useEffect, useRef } from "react";
import axios from "../axiosInstance.js";
import { toast } from "react-toastify";
import "./PatientModal.css";

const CreatePatientModal = ({ onClose, addPatient  }) => {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const modalRef = useRef(null);

  const handleCreate = async () => {
    try {
      const res = await axios.post("/api/patient/add", {
        identifier: patientId,
        name: patientName,
      });

      if (res.status === 201) {
        toast.success("Patient created successfully");
        addPatient(res.data);
      } else {
        toast.error("Failed to create patient");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating patient");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
        setPatientId("");
        setPatientName("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
     
          <>
            <h2>Create Patient</h2>
            <input
              type="text"
              placeholder="Patient Identifier"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
          </>
       
      </div>
    </div>
  );
};

export default CreatePatientModal;
