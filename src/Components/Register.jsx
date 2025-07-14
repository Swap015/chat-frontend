import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`http://localhost:3002/register`, formData);

      navigate("/login");
      console.log(res.data);
    } catch (err) {
      alert("Registration failed.", err);
    }
  };

  return (
    <div >
      <h2>Register</h2>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
