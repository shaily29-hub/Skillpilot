import { useEffect, useState } from "react";
import { getAllResumes } from "../services/adminService";

function AdminDashboard() {

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllResumes();
      setResumes(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <h3>Total Resumes: {resumes.length}</h3>

      <hr />

      {resumes.map((r) => (
        <div key={r.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p>ID: {r.id}</p>
          <p>Email: {r.userEmail}</p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;