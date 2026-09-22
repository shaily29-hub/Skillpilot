import { useState } from "react";
import { matchJD } from "../services/jdMatchService";

function JDMatch() {

  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] = useState(null);

  const handleMatch = async () => {

    try {

      const data = await matchJD(
        Number(resumeId),
        jobDescription
      );

      console.log(data);

      setResult(data);

    } catch (err) {

      console.log(err);

      alert("JD Matching Failed");
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
        maxWidth: "1050px",
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
          Job Description Match
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginTop: "8px"
          }}
        >
          Compare your resume with a job description and identify
          matching and missing skills.
        </p>

      </div>


      {/* Input Section */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.04)",
          marginBottom: "25px"
        }}
      >

        <h2
          style={{
            marginTop: 0,
            color: "#111827"
          }}
        >
          Enter Job Details
        </h2>

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#374151"
          }}
        >
          Resume ID
        </label>

        <input
          type="number"
          placeholder="Enter Resume ID"
          value={resumeId}
          onChange={(e) =>
            setResumeId(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "9px",
            boxSizing: "border-box",
            marginBottom: "20px",
            fontSize: "15px"
          }}
        />

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#374151"
          }}
        >
          Job Description
        </label>

        <textarea
          rows="12"
          placeholder="Paste the complete job description here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "9px",
            boxSizing: "border-box",
            resize: "vertical",
            fontSize: "15px",
            lineHeight: "1.5",
            fontFamily: "inherit"
          }}
        />

        <button
          onClick={handleMatch}
          style={{
            marginTop: "20px",
            background: "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Match Resume
        </button>

      </div>


      {/* Result Section */}

      {result && (

        <div>

          <h2
            style={{
              color: "#111827",
              marginBottom: "18px"
            }}
          >
            Match Result
          </h2>


          {/* Match Score */}

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "20px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
            }}
          >

            <p
              style={{
                color: "#6b7280",
                marginBottom: "5px"
              }}
            >
              Resume Match Score
            </p>

            <div
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#4f46e5"
              }}
            >
              {result.matchScore}%
            </div>

          </div>


          {/* Skills */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: "20px",
              marginBottom: "20px"
            }}
          >

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "25px"
              }}
            >

              <h3 style={{ color: "#111827" }}>
                Matched Skills
              </h3>

              <ul>
                {result.matchedSkills.map(
                  (skill, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "8px",
                        color: "#374151"
                      }}
                    >
                      {skill}
                    </li>
                  )
                )}
              </ul>

            </div>


            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "25px"
              }}
            >

              <h3 style={{ color: "#111827" }}>
                Missing Skills
              </h3>

              <ul>
                {result.missingSkills.map(
                  (skill, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "8px",
                        color: "#374151"
                      }}
                    >
                      {skill}
                    </li>
                  )
                )}
              </ul>

            </div>

          </div>


          {/* Recommendation */}

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "20px"
            }}
          >

            <h3 style={{ color: "#111827" }}>
              Recommendation
            </h3>

            <p
              style={{
                color: "#4b5563",
                lineHeight: "1.7",
                marginBottom: 0
              }}
            >
              {result.recommendation}
            </p>

          </div>

        </div>

      )}

    </div>

  </div>
);
}

export default JDMatch;