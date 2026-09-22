import { useNavigate } from "react-router-dom";
import aiInterviewer from "../assets/AI-interviewer.png";
import "./Dashboard.css";
function Dashboard() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName");

  const token =
    localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login", { replace: true });
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      background: "#f6f8fc",
      fontFamily: "Inter, Arial, sans-serif"
    }}
  >

    {/* SIDEBAR */}

    <div
    className="dashboard-sidebar"
      style={{
        width: "240px",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        padding: "25px 18px",
        boxSizing: "border-box"
      }}
    >

      {/* BRAND */}

      <div
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#4f46e5",
          marginBottom: "40px",
          paddingLeft: "10px",
          display: "flex",
flexDirection: "column"
        }}
      >
        ✦ SkillPilot
      </div>


      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >

        <button
          style={{
            textAlign: "left",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#eef2ff",
            color: "#4f46e5",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🏠 Dashboard
        </button>


        <button
          onClick={() => navigate("/resume-upload")}
          style={{
            textAlign: "left",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            color: "#4b5563",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          📄 Resume Analysis
        </button>


        <button
          onClick={() => navigate("/jd-match")}
          style={{
            textAlign: "left",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            color: "#4b5563",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🎯 Job Match
        </button>


        <button
          onClick={() => navigate("/mock-interview")}
          style={{
            textAlign: "left",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            color: "#4b5563",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🎤 Mock Interview
        </button>


        <button
          onClick={() => navigate("/resume-history")}
          style={{
            textAlign: "left",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            color: "#4b5563",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          📊 Resume History
        </button>

      </div>

    </div>


    {/* MAIN CONTENT */}

    <div
    className="dashboard-main"
      style={{
        flex: 1,
        padding: "35px 45px",
        boxSizing: "border-box"
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px"
        }}
      >

        <div>

          <h1 className="dashboard-title">
  Welcome back, {userName} 👋
</h1>
          <p
            style={{
              marginTop: "8px",
              color: "#6b7280"
            }}
          >
            Ready to prepare for your next opportunity?
          </p>

        </div>
        {/* STATS */}

<div
className="dashboard-stats"
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  }}
>

  {/* RESUMES */}

  <div
    style={{
      position: "relative",
overflow: "hidden",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "14px",
      border: "1px solid #e5e7eb",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.03)"
    }}
  >

    <div
      style={{
        fontSize: "24px",
        marginBottom: "10px"
      }}
    >
      📄
    </div>

    <p
      style={{
        margin: 0,
        fontSize: "13px",
        color: "#6b7280"
      }}
    >
      Resumes Analyzed
    </p>

    <h2
  style={{
    margin: "5px 0 0",
    color: "#111827",
    fontSize: "26px"
  }}
>
  0
</h2>

<p
  style={{
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#9ca3af"
  }}
>
  Keep building your profile
</p>

  </div>


  {/* JOB MATCHES */}

  <div
    style={{
      position: "relative",
overflow: "hidden",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "14px",
      border: "1px solid #e5e7eb",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.03)"
    }}
  >

    <div
      style={{
        fontSize: "24px",
        marginBottom: "10px"
      }}
    >
      🎯
    </div>

    <p
      style={{
        margin: 0,
        fontSize: "13px",
        color: "#6b7280"
      }}
    >
      Job Matches
    </p>

    <h2
  style={{
    margin: "5px 0 0",
    color: "#111827",
    fontSize: "26px"
  }}
>
  0
</h2>

<p
  style={{
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#9ca3af"
  }}
>
  Start matching with jobs
</p>

  </div>


  {/* INTERVIEWS */}

  <div
    style={{
      position: "relative",
overflow: "hidden",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "14px",
      border: "1px solid #e5e7eb",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.03)"
    }}
  >

    <div
      style={{
        fontSize: "24px",
        marginBottom: "10px"
      }}
    >
      🎤
    </div>

    <p
      style={{
        margin: 0,
        fontSize: "13px",
        color: "#6b7280"
      }}
    >
      Mock Interviews
    </p>

   <h2
  style={{
    margin: "5px 0 0",
    color: "#111827",
    fontSize: "26px"
  }}
>
  0
</h2>

<p
  style={{
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#9ca3af"
  }}
>
  Practice makes progress
</p>

  </div>

</div>




        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "9px",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            color: "#374151",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          Logout
        </button>

      </div>

      

{/* AI MOCK INTERVIEW HERO */}

<div
 className="ai-interview-hero"
  style={{
    background:
      "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
      boxShadow: "0 8px 25px rgba(79, 70, 229, 0.08)",
transition: "transform 0.2s ease, box-shadow 0.2s ease",
    borderRadius: "18px",
    padding: "28px",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    border: "1px solid #c7d2fe",
    overflow: "hidden"
  }}
>

  {/* LEFT CONTENT */}

  <div style={{ flex: 1 }}>

    <div
      style={{
        display: "inline-block",
        padding: "6px 10px",
        background: "#ffffff",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        color: "#4f46e5",
        marginBottom: "12px"
      }}
    >
      ✨ AI POWERED
    </div>

    <h2
      style={{
        margin: "0 0 10px",
        fontSize: "28px",
        color: "#111827"
      }}
    >
      Practice with your AI Interviewer
    </h2>

    <p
      style={{
        margin: "0 0 20px",
        color: "#4b5563",
        fontSize: "15px",
        lineHeight: "1.6",
        maxWidth: "520px"
      }}
    >
      Simulate a real interview, answer AI-generated questions,
      and receive personalized feedback to improve your performance.
    </p>

    <button
      onClick={() => navigate("/mock-interview")}
      style={{
        padding: "12px 20px",
        borderRadius: "10px",
        border: "none",
        background: "#4f46e5",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(79,70,229,0.25)"
      }}
    >
      Start Mock Interview →
    </button>

  </div>


  {/* AI INTERVIEWER */}

  <div
    style={{
      width: "190px",
      height: "190px",
      borderRadius: "18px",
      background: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      flexShrink: 0
    }}
  >

    <img
      src={aiInterviewer}
      alt="AI Interviewer"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "contain"
      }}
    />

  </div>

</div>
{/* RECENT ACTIVITY */}

<div
  style={{
    marginTop: "30px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
  }}
>

  <h2
    style={{
      margin: "0 0 20px",
      fontSize: "20px",
      color: "#111827"
    }}
  >
    Recent Activity
  </h2>


  {/* ACTIVITY 1 */}

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 0",
      borderBottom: "1px solid #f0f0f0"
    }}
  >

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px"
      }}
    >

      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "#eef2ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        📄
      </div>

      <div>

        <p
          style={{
            margin: 0,
            fontWeight: "600",
            color: "#111827"
          }}
        >
          Resume Analysis
        </p>

        <p
          style={{
            margin: "4px 0 0",
            fontSize: "13px",
            color: "#6b7280"
          }}
        >
          Analyze your resume
        </p>

      </div>

    </div>

    <span
      style={{
        fontSize: "13px",
        color: "#9ca3af"
      }}
    >
      Recently
    </span>

  </div>


  {/* ACTIVITY 2 */}

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 0",
      borderBottom: "1px solid #f0f0f0"
    }}
  >

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px"
      }}
    >

      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "#eef2ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        🎯
      </div>

      <div>

        <p
          style={{
            margin: 0,
            fontWeight: "600",
            color: "#111827"
          }}
        >
          Job Match
        </p>

        <p
          style={{
            margin: "4px 0 0",
            fontSize: "13px",
            color: "#6b7280"
          }}
        >
          Compare your resume with a job
        </p>

      </div>

    </div>

    <span
      style={{
        fontSize: "13px",
        color: "#9ca3af"
      }}
    >
      Recently
    </span>

  </div>


  {/* ACTIVITY 3 */}

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 0"
    }}
  >

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px"
      }}
    >

      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "#eef2ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        🎤
      </div>

      <div>

        <p
          style={{
            margin: 0,
            fontWeight: "600",
            color: "#111827"
          }}
        >
          Mock Interview
        </p>

        <p
          style={{
            margin: "4px 0 0",
            fontSize: "13px",
            color: "#6b7280"
          }}
        >
          Practice with AI interviewer
        </p>

      </div>

    </div>

    <span
      style={{
        fontSize: "13px",
        color: "#9ca3af"
      }}
    >
      Recently
    </span>

  </div>

</div>
      {/* FEATURE CARDS */}

      <div
       className="dashboard-features"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "20px"
        }}
      >

        {/* RESUME */}

       <div
  onClick={() => navigate("/resume-upload")}
  style={{
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }}
>

          <div
            style={{
              fontSize: "28px",
              marginBottom: "15px"
            }}
          >
            📄
          </div>

          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#111827"
            }}
          >
            Resume Analysis
          </h3>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.5"
            }}
          >
            Analyze your resume and discover areas
            you can improve.
          </p>

          <button
            onClick={() => navigate("/resume-upload")}
            style={{
              marginTop: "10px",
              border: "none",
              background: "transparent",
              color: "#4f46e5",
              fontWeight: "600",
              cursor: "pointer",
              padding: 0
            }}
          >
            Analyze Resume →
          </button>

        </div>


        {/* JOB MATCH */}

       <div
  onClick={() => navigate("/jd-match")}
  style={{
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }}
>
          <div
            style={{
              fontSize: "28px",
              marginBottom: "15px"
            }}
          >
            🎯
          </div>

          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#111827"
            }}
          >
            Job Match
          </h3>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.5"
            }}
          >
            Compare your resume with a job description
            and see how well you match.
          </p>

          <button
            onClick={() => navigate("/jd-match")}
            style={{
              marginTop: "10px",
              border: "none",
              background: "transparent",
              color: "#4f46e5",
              fontWeight: "600",
              cursor: "pointer",
              padding: 0
            }}
          >
            Check Job Match →
          </button>

        </div>


        {/* MOCK INTERVIEW */}

       <div
  onClick={() => navigate("/mock-interview")}
  style={{
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }}
>

          <div
            style={{
              fontSize: "28px",
              marginBottom: "15px"
            }}
          >
            🎤
          </div>

          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#111827"
            }}
          >
            AI Mock Interview
          </h3>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.5"
            }}
          >
            Practice realistic interviews with your
            AI interviewer.
          </p>

          <button
            onClick={() => navigate("/mock-interview")}
            style={{
              marginTop: "10px",
              border: "none",
              background: "transparent",
              color: "#4f46e5",
              fontWeight: "600",
              cursor: "pointer",
              padding: 0
            }}
          >
            Start Interview →
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default Dashboard;