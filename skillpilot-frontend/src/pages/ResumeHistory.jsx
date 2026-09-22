import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyResumes,
  deleteResume
} from "../services/historyService";

function ResumeHistory() {

  const [resumes, setResumes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchResumes = async () => {

      try {

        const data = await getMyResumes();

        console.log(data);

        setResumes(data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchResumes();

  }, []);
  const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this resume?"
    );

  if (!confirmDelete) return;

  try {

    await deleteResume(id);

    setResumes(
      resumes.filter(
        (resume) =>
          resume.id !== id
      )
    );

    alert(
      "Resume deleted successfully"
    );

  } catch (err) {

    console.log(err);

    alert(
      "Failed to delete resume"
    );
  }
};

return (
  <div
    style={{
      minHeight: "100vh",
      background: "#f6f8fc",
      padding: "40px",
      boxSizing: "border-box",
      fontFamily: "Inter, Arial, sans-serif"
    }}
  >

    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto"
      }}
    >

      <div style={{ marginBottom: "30px" }}>

        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#111827"
          }}
        >
          My Resumes
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginTop: "8px"
          }}
        >
          View and manage your previously analyzed resumes.
        </p>

      </div>


      {resumes.length === 0 ? (

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "50px",
            textAlign: "center"
          }}
        >

          <h2 style={{ color: "#111827" }}>
            No resumes yet
          </h2>

          <p style={{ color: "#6b7280" }}>
            Upload your first resume to start your AI analysis.
          </p>

        </div>

      ) : (

        resumes.map((resume) => (

          <div
            key={resume.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "22px",
              marginBottom: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap"
              }}
            >

              <div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    color: "#111827"
                  }}
                >
                  Resume #{resume.id}
                </h3>

                <p
                  style={{
                    margin: "5px 0",
                    color: "#6b7280"
                  }}
                >
                  Status:{" "}
                  <strong style={{ color: "#4f46e5" }}>
                    {resume.status}
                  </strong>
                </p>

                <p
                  style={{
                    margin: "5px 0",
                    color: "#6b7280"
                  }}
                >
                  Uploaded:{" "}
                  {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleString()
                    : "Older Resume"}
                </p>

              </div>


              <div
                style={{
                  display: "flex",
                  gap: "10px"
                }}
              >

                <button
                  onClick={() =>
                    navigate(`/resume-status/${resume.id}`)
                  }
                  style={{
                    background: "#4f46e5",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "9px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  View Analysis
                </button>


                <button
                  onClick={() =>
                    handleDelete(resume.id)
                  }
                  style={{
                    background: "#ffffff",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    padding: "10px 16px",
                    borderRadius: "9px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))

      )}

    </div>

  </div>
);
}

export default ResumeHistory;