import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview } from "../services/mockInterviewService";

function MockInterview() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [questionCount, setQuestionCount] =
    useState(5);
    const [loading, setLoading] = useState(false);

  const handleStart = async () => {

  if (!role.trim()) {
    alert("Please enter your target role");
    return;
  }

  if (!skills.trim()) {
    alert("Please enter the skills you want to practice");
    return;
  }

  try {

    setLoading(true);

    const res = await startInterview({
      role,
      skills,
      questionCount
    });

    navigate(
      `/mock-interview/${res.data.id}`
    );

  } catch (err) {

    console.log(err);

    alert("Failed to start interview");

  } finally {

    setLoading(false);

  }
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fc",
        padding: "50px 20px",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto"
        }}
      >

        {/* Header */}

        <div
          style={{
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              display: "inline-block",
              padding: "7px 14px",
              background: "#eef2ff",
              color: "#4f46e5",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "14px"
            }}
          >
            AI MOCK INTERVIEW
          </div>

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "32px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Prepare for your interview
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "15px",
              lineHeight: "1.6"
            }}
          >
            Tell us about the role you're targeting and
            the skills you want to practice. Your AI
            interviewer will create questions based on
            your inputs.
          </p>

        </div>


        {/* Main Card */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
          }}
        >

          {/* Role */}

          <div style={{ marginBottom: "24px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151"
              }}
            >
              Target Role
            </label>

            <input
              type="text"
              placeholder="e.g. Java Backend Developer"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />

            <p
              style={{
                margin: "7px 0 0",
                fontSize: "12px",
                color: "#9ca3af"
              }}
            >
              Enter the role you're preparing for.
            </p>

          </div>


          {/* Skills */}

          <div style={{ marginBottom: "24px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151"
              }}
            >
              Skills to Practice
            </label>

            <textarea
              rows="5"
              placeholder="e.g. Java, Spring Boot, SQL, REST APIs, React"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "14px",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />

            <p
              style={{
                margin: "7px 0 0",
                fontSize: "12px",
                color: "#9ca3af"
              }}
            >
              Separate multiple skills with commas.
            </p>

          </div>


          {/* Question Count */}

          <div style={{ marginBottom: "30px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151"
              }}
            >
              Number of Questions
            </label>

            <select
              value={questionCount}
              onChange={(e) =>
                setQuestionCount(
                  Number(e.target.value)
                )
              }
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "14px",
                background: "#ffffff",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
            </select>

          </div>


          {/* Info */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              padding: "14px 16px",
              background: "#f8fafc",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              marginBottom: "25px"
            }}
          >

            <div
              style={{
                fontSize: "18px"
              }}
            >
              🤖
            </div>

            <div>

              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "3px"
                }}
              >
                AI-powered interview
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  lineHeight: "1.5"
                }}
              >
                Questions will be generated based on
                your selected role and skills.
              </div>

            </div>

          </div>


          {/* Start Button */}

         <button
  onClick={handleStart}
  disabled={loading}
  style={{
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background: loading ? "#818cf8" : "#4f46e5",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "0.2s"
  }}
>
  {loading ? "Preparing Interview..." : "Start Interview →"}
</button>

        </div>

      </div>

    </div>
  );
}

export default MockInterview;