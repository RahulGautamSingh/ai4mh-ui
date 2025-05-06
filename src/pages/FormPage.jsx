import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance.js";
import { PHQ9_QUESTIONS, MADRS_QUESTIONS } from "../constants";
import "./FormPage.css";
import { toast } from "react-toastify";

export default function FormPage() {
  const { formId } = useParams(); // Get formId from URL params
  const formType = formId.split("-")[0];
  const [formData, setFormData] = useState({});
  const formQuestions = formType.startsWith("P")
    ? PHQ9_QUESTIONS
    : MADRS_QUESTIONS;

  const [isSubmitted, setIsSubmitted] = useState(true);
  const isDoctor = localStorage.getItem("authToken");
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

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

  function getScore(idx, type) {
    if (type === "PHQ") {
      return idx;
    }

    return idx * 2;
  }

  useEffect(() => {
    // Fetch form data and details on page load
    axiosInstance.get(`/api/form/${formId}`).then((response) => {
      const data = response.data;
      console.log(data);
      setFormData(data);
      setIsSubmitted(data.submitted);
      setResponses(data.responses ?? {});
      setLoading(false);
    });
  }, [formId]);

  const handleSubmit = () => {
    const totalQuestions = formQuestions.length;
    if (Object.keys(responses).length !== totalQuestions) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    axiosInstance
      .post(`/api/form/submit/${formId}`, { responses })
      .then(() => {
        setIsSubmitted(true);
        toast.success("Form submitted successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error submitting form.");
      });
  };

  return (
    <div className="form-page-container">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="form-right">
            <div className="data-for-all">
              <div className="section patient-info">
                <h3>Patient Details</h3>
                <p>
                  <strong>Name:</strong> {formData.patient.name}
                </p>
                <p>
                  <strong>Patient ID:</strong> {formData.patient.identifier}
                </p>
              </div>
              <div className="section doctor-info">
                <h3>Doctor Details</h3>
                <p>
                  <strong>Name:</strong> {formData.doctor.name}
                </p>
              </div>
            </div>

            {isDoctor && isSubmitted && (
              <div className="data-for-doctor">
                <div className="section assessment">
                  <h3>Assessment</h3>
                  <p>{getAssessment(formData.score)}</p>
                </div>

                <div className="section score">
                  <h3>Score</h3>
                  <p>{formData.score}</p>
                </div>

                <div className="data-for-doctor">
                  <div className="section status">
                    <h3>Form Status</h3>
                    <p className="status-pill completed">Completed</p>
                  </div>
                </div>
              </div>
            )}

            {isDoctor && !isSubmitted && (
              <div className="data-for-doctor">
                <div className="section status">
                  <h3>Form Status</h3>
                  <p className="status-pill pending">Pending</p>
                </div>
              </div>
            )}

            {!isDoctor && isSubmitted && (
              <div className="data-for-doctor">
                <div className="section status">
                  <h3>Form Status</h3>
                  <p className="status-pill completed">Completed</p>
                </div>
                <div className="section message">
                  <h3>Please contact your doctor for results!</h3>
                </div>
              </div>
            )}
          </div>

          <div className="form-left">
            <h2>Form Questions</h2>
            <div className="form-questions">
              {formQuestions.map((question, index) => (
                <div key={index} className="question-card">
                  <h3>{question.question}</h3>
                  {question.description && (
                    <div className="question-description">
                      <span> {question.description ?? ""}</span>
                      <br />

                      <span style={{ fontStyle: "italic", fontSize: "13px" }}>
                        {question.italic ?? ""}
                      </span>
                    </div>
                  )}

                  <div className="options">
                    {question.options.map((option, idx) => (
                      <label key={idx} className="option-label">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={getScore(idx, formType)}
                          disabled={isDoctor || isSubmitted}
                          checked={responses[index] === getScore(idx, formType)}
                          onChange={() =>
                            setResponses((prev) => ({
                              ...prev,
                              [index]: getScore(idx, formType),
                            }))
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
       {/* Submit Button */}
       {!loading && !isSubmitted && !isDoctor && (
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            )}
    </div>
  );
}
