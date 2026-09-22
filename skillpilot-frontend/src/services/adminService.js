import api from "../api/axios";

export const getAllResumes = async () => {
  const res = await api.get("/api/admin/resumes", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return res.data;
};