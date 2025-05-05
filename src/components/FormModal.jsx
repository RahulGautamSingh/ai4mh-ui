import { useState, useRef, useEffect } from "react";
import axios from "../axiosInstance.js";
import { toast } from "react-toastify";
import "./FormModal.css";

const FormModal = ({ onClose, addForm }) => {
  const [patientId, setPatientId] = useState("");
  const [formType, setFormType] = useState("PHQ-9");
  const [formLink, setFormLink] = useState(null);
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        resetAndClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetAndClose = () => {
    setPatientId("");
    setFormType("PHQ-9");
    setFormLink(null);
    onClose(); // parent should hide modal
  };

  const handleCreate = async () => {
    if (!patientId || !formType) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/form/create", {
        patientId,
        type: formType,
      });

      if (res.status === 201) {
        toast.success("Form created successfully");
        const formId = res.data.form.formId;
        setFormLink(`http://localhost:5173/form/${formId}`);
        addForm(res.data.form);
      } else {
        toast.error("Form not created");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Form creation failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        {formLink ? (
          <div>
            <p className="font-bold mb-2">Form created!</p>
            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="form-link"
            >
              {formLink}
            </a>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Create New Form</h2>
            <input
              type="text"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="modal-input"
            />

            <div className="form-type-radio">
              <label>
                <input
                  type="radio"
                  value="PHQ-9"
                  checked={formType === "PHQ-9"}
                  onChange={() => setFormType("PHQ-9")}
                />
                PHQ-9
              </label>
              <label>
                <input
                  type="radio"
                  value="MADRS"
                  checked={formType === "MADRS"}
                  onChange={() => setFormType("MADRS")}
                />
                MADRS
              </label>
            </div>

            <button onClick={handleCreate} className="modal-create-btn">
              Create Form
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormModal;
