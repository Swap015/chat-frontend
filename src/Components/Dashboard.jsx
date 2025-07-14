import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/profile`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error("Token expired or invalid", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3002/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      alert("Logout failed", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? <p>Welcome, {user.email}</p> : <p>Loading profile…</p>}

      <button style={{ marginTop: 20 }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
