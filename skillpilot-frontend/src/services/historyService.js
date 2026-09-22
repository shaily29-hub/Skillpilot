import api from "../api/axios";

export const getMyResumes = async () => {

  const response = await api.get(
    "/api/resume/my-resumes",
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export const deleteResume = async (id) => {

  const response = await api.delete(
    `/api/resume/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};