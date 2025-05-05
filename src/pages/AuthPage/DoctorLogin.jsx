import { useState } from "react";
import axios from "../../axiosInstance.js";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const DoctorLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/doctor/login",
        formData
      );

      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.token); // Save token
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        // Unexpected response
        toast.error("Login failed" + res.data.message);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
      setFormData({ name: "", email: "", password: "" });
    }

    console.log("Login form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
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
      <button type="submit">Login</button>
    </form>
  );
};

export default DoctorLogin;
