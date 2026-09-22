import api from "../api/axios";

export const matchJD = async (
  resumeId,
  jobDescription
) => {

  const response = await api.post(
    "/api/resume/match-jd",
    {
      resumeId,
      jobDescription,
    },
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};