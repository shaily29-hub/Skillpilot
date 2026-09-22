import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeAnalysis } from "../services/analysisService";
import { downloadReport } from "../services/reportService";

function ResumeStatus() {

  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {

    const fetchAnalysis = async () => {

      try {

        const data = await getResumeAnalysis(id);

        console.log(data);

        setAnalysis(data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchAnalysis();

  }, [id]);

  const handleDownloadReport = async () => {

    try {

      const pdfBlob = await downloadReport(id);

      const url = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "resume-report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (err) {

      console.log(err);

      alert("Failed to download report");
    }
  };

  if (!analysis) {
    return <h2>Loading...</h2>;
  }

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
        maxWidth: "1100px",
        margin: "0 auto"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >

        <div>
          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "32px"
            }}
          >
            Resume Analysis
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px"
            }}
          >
            AI-powered insights from your resume
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          style={{
            background: "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Download PDF Report
        </button>

      </div>


      {/* Score Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "25px"
        }}
      >

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
          }}
        >
          <p style={{ color: "#6b7280", margin: 0 }}>
            ATS Score
          </p>

          <h2
            style={{
              fontSize: "32px",
              color: "#4f46e5",
              margin: "10px 0 0"
            }}
          >
            {analysis.atsScore}
          </h2>
        </div>


        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
          }}
        >
          <p style={{ color: "#6b7280", margin: 0 }}>
            Best Role
          </p>

          <h2
            style={{
              fontSize: "24px",
              color: "#111827",
              margin: "10px 0 0"
            }}
          >
            {analysis.bestRole}
          </h2>
        </div>


        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
          }}
        >
          <p style={{ color: "#6b7280", margin: 0 }}>
            Match Score
          </p>

          <h2
            style={{
              fontSize: "32px",
              color: "#4f46e5",
              margin: "10px 0 0"
            }}
          >
            {analysis.matchScore}%
          </h2>
        </div>

      </div>


      {/* Resume Summary */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          marginBottom: "25px"
        }}
      >

        <h2>Resume Summary</h2>

        <p
          style={{
            color: "#4b5563",
            lineHeight: "1.7"
          }}
        >
          {analysis.resumeSummary}
        </p>

      </div>


      {/* Skills + Missing Skills */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "25px"
        }}
      >

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb"
          }}
        >

          <h2>Skills</h2>

          <ul>
            {analysis.skills.map((skill, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  color: "#374151"
                }}
              >
                {skill}
              </li>
            ))}
          </ul>

        </div>


        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb"
          }}
        >

          <h2>Missing Skills</h2>

          <ul>
            {analysis.missingSkills.map((skill, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  color: "#374151"
                }}
              >
                {skill}
              </li>
            ))}
          </ul>

        </div>

      </div>


      {/* Strengths + Weaknesses */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "25px"
        }}
      >

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb"
          }}
        >

          <h2>Strengths</h2>

          <ul>
            {analysis.strengths.map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  color: "#374151"
                }}
              >
                {item}
              </li>
            ))}
          </ul>

        </div>


        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb"
          }}
        >

          <h2>Weaknesses</h2>

          <ul>
            {analysis.weaknesses.map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  color: "#374151"
                }}
              >
                {item}
              </li>
            ))}
          </ul>

        </div>

      </div>


      {/* Suggestions */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          marginBottom: "25px"
        }}
      >

        <h2>Suggestions</h2>

        <ul>
          {analysis.suggestions.map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                color: "#374151",
                lineHeight: "1.5"
              }}
            >
              {item}
            </li>
          ))}
        </ul>

      </div>


      {/* Top Matching Roles */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          marginBottom: "25px"
        }}
      >

        <h2>Top Matching Roles</h2>

        {analysis.topRoles.map((role, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom:
                index !== analysis.topRoles.length - 1
                  ? "1px solid #f3f4f6"
                  : "none"
            }}
          >

            <span style={{ color: "#374151" }}>
              {role.role}
            </span>

            <strong style={{ color: "#4f46e5" }}>
              {role.score}%
            </strong>

          </div>
        ))}

      </div>


      {/* Score Breakdown */}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb"
        }}
      >

        <h2>Score Breakdown</h2>

        <p>
          <strong>Skills:</strong>{" "}
          {analysis.scoreBreakdown.skills}
        </p>

        <p>
          <strong>Projects:</strong>{" "}
          {analysis.scoreBreakdown.projects}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {analysis.scoreBreakdown.experience}
        </p>

        <p>
          <strong>ATS Compatibility:</strong>{" "}
          {analysis.scoreBreakdown.atsCompatibility}
        </p>

      </div>

    </div>

  </div>
);
}

export default ResumeStatus;