import api from "../api/axios";

export const downloadReport = async (id) => {

  const response = await api.get(
    `/api/resume/${id}/report`,
    {
      responseType: "blob",
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};