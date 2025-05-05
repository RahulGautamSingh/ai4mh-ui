// src/pages/DoctorSignup.jsx
import { useState } from "react";
import axios from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/doctor/register",
        formData
      );

      if (res.status === 201) {
        localStorage.setItem("authToken", res.data.token); // Save token
        // Navigate to dashboard
        navigate("/dashboard");

      } else {
        // Unexpected response
        toast.error("Signup failed. Please try again.");
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.");
      setFormData({ name: "", email: "", password: "" });
    }

    console.log("Signup form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default DoctorSignup;
