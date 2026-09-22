import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInterviewReport,
  downloadInterviewReport
} from "../services/interviewReportService";

function InterviewReport() {

  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const handleDownload = async () => {

  try {

    const blob = await downloadInterviewReport(sessionId);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "interview-report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {

    console.log(err);
    alert("Failed to download interview report");

  }

};

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const data = await getInterviewReport(sessionId);

        console.log(data);

        setReport(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchReport();

  }, [sessionId]);

  if (!report) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>Loading Interview Report...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px"
      }}
    >

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}
      >

        {/* Header */}

        <div
          style={{
            marginBottom: "30px"
          }}
        >

          <h1
            style={{
              marginBottom: "8px"
            }}
          >
            Interview Report
          </h1>

          <p
            style={{
              color: "#666",
              margin: 0
            }}
          >
            Review your interview performance and AI feedback.
          </p>

        </div>


        {/* Overall Performance */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "35px"
          }}
        >

          {/* Total Questions */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >

            <p
              style={{
                margin: 0,
                color: "#777"
              }}
            >
              Total Questions
            </p>

            <h2
              style={{
                margin: "10px 0 0"
              }}
            >
              {report.totalQuestions}
            </h2>

          </div>


          {/* Total Score */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >

            <p
              style={{
                margin: 0,
                color: "#777"
              }}
            >
              Total Score
            </p>

            <h2
              style={{
                margin: "10px 0 0"
              }}
            >
              {report.totalScore}/{report.totalQuestions * 10}
            </h2>

          </div>


          {/* Average Score */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >

            <p
              style={{
                margin: 0,
                color: "#777"
              }}
            >
              Average Score
            </p>

            <h2
              style={{
                margin: "10px 0 0"
              }}
            >
              {report.averageScore}/10
            </h2>

          </div>

        </div>


        {/* Question Analysis */}

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Question-wise Analysis
        </h2>


        {report.answers.map((item, index) => (

          <div
            key={index}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "25px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >

            {/* Question Header */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                marginBottom: "20px"
              }}
            >

              <h3
                style={{
                  margin: 0
                }}
              >
                Question {index + 1}
              </h3>

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                {item.score}/10
              </div>

            </div>


            {/* Question */}

            <div
              style={{
                marginBottom: "20px"
              }}
            >

              <h4>Question</h4>

              <p
                style={{
                  lineHeight: "1.6"
                }}
              >
                {item.question}
              </p>

            </div>


            {/* Answer */}

            <div
              style={{
                marginBottom: "20px"
              }}
            >

              <h4>Your Answer</h4>

              <div
                style={{
                  background: "#f8f9fc",
                  padding: "15px",
                  borderRadius: "8px",
                  lineHeight: "1.6"
                }}
              >
                {item.answer}
              </div>

            </div>


            {/* Feedback */}

            <div>

              <h4>AI Feedback</h4>

              <div
                style={{
                  background: "#f8f9fc",
                  padding: "15px",
                  borderRadius: "8px",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap"
                }}
              >
                {item.feedback}
              </div>

            </div>

          </div>

        ))}


        {/* Bottom Actions */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "30px"
          }}
        >

        <button
  onClick={handleDownload}
  style={{
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Download PDF
</button>

          <button
            onClick={() => navigate("/mock-interview")}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Retake Interview
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Go to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default InterviewReport;