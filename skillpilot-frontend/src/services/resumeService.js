import api from "../api/axios";

export const uploadResume = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/api/resume/upload",
    formData,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};