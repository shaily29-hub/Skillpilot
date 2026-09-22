import api from "../api/axios";

export const getResumeAnalysis = async (id) => {
  const response = await api.get(
    `/api/resume/${id}/analyze`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};