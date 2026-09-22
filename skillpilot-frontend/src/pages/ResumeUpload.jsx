import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../services/resumeService";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {

      const res = await uploadResume(file);

      console.log(res);

      alert("Resume Uploaded Successfully");

      navigate(`/resume-status/${res.data.resumeId}`);

    } catch (err) {

      console.log(err);

      alert("Upload Failed");
    }
  };

return (
  <div
    style={{
      minHeight: "100vh",
      background: "#f6f8fc",
      padding: "50px",
      boxSizing: "border-box",
      fontFamily: "Inter, Arial, sans-serif"
    }}
  >

    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto"
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          color: "#111827",
          marginBottom: "8px"
        }}
      >
        Resume Analyzer
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px"
        }}
      >
        Upload your resume and get AI-powered insights about your skills,
        ATS score, matching roles, and improvement areas.
      </p>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "40px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
          textAlign: "center"
        }}
      >

        <h2
          style={{
            color: "#111827",
            marginBottom: "10px"
          }}
        >
          Upload Your Resume
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Choose your resume file to start the analysis.
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          style={{
            marginBottom: "25px"
          }}
        />

        {file && (
          <p
            style={{
              color: "#4f46e5",
              fontWeight: "600",
              marginBottom: "20px"
            }}
          >
            Selected: {file.name}
          </p>
        )}

        <br />

        <button
          onClick={handleUpload}
          style={{
            background: "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "12px 28px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Analyze Resume
        </button>

      </div>

    </div>

  </div>
);
}

export default ResumeUpload;