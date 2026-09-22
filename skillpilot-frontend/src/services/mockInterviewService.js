import api from "../api/axios";

export const startInterview = async (data) => {

  const response = await api.post(
    "/api/mock-interview/start",
    data,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};

export const getQuestion = async (sessionId) => {

  const response = await api.get(
    `/api/mock-interview/question/${sessionId}`,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};

export const submitAnswer = async (
  sessionId,
  answer
) => {

  const response = await api.post(
    "/api/mock-interview/answer",
    {
      sessionId,
      answer
    },
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};

export const downloadInterviewReport = async (sessionId) => {

  const response = await api.get(
    `/api/mock-interview/report/${sessionId}/pdf`,
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

export const getInterviewReport =
  async (sessionId) => {

    const response = await api.get(
      `/api/mock-interview/report/${sessionId}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    return response.data;
};