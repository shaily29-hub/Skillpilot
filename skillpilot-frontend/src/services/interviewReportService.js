import api from "../api/axios";

export const getInterviewReport = async (
  sessionId
) => {

  const response = await api.get(
    `/api/mock-interview/report/${sessionId}`,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data.data;
};


// Download Interview Report PDF

export const downloadInterviewReport = async (
  sessionId
) => {

  const response = await api.get(
    `/api/mock-interview/report/${sessionId}/pdf`,
    {
      responseType: "blob",
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};