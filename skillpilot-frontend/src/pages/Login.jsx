import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import aiInterviewer from "../assets/AI-interviewer.png";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  setLoading(true);

  try {
    const res = await loginUser(email, password);

    console.log(res);

    // Store login data
    localStorage.setItem("token", res.token);
    localStorage.setItem("userName", res.name);
    localStorage.setItem("role", res.role);

    // Role based navigation
    if (res.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }

  }  catch (err) {
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("MESSAGE:", err.message);

  setError(
    err.response?.data?.message ||
    "Login failed. Please check your email and password."
  );
  } finally {
    setLoading(false);
  }
};

   return (
    <div
  className="login-page"
  style={{
    minHeight: "100vh",
    display: "flex",
    background: "#f6f8fc",
    fontFamily: "Inter, Arial, sans-serif"
  }}
>

      {/* LEFT SIDE */}

{/* LEFT SIDE */}

<div
  className="login-left"
  style={{
    flex: 1,
    background:
      "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px"
  }}
>
  <div
    style={{
      maxWidth: "500px"
    }}
  >

    {/* Brand */}

    <div
      style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#4f46e5",
        marginBottom: "35px"
      }}
    >
      ✦ SkillPilot
    </div>


    {/* Main Heading */}

    <h2
      style={{
        fontSize: "42px",
        lineHeight: "1.15",
        margin: "0 0 20px 0",
        color: "#111827"
      }}
    >
      Prepare smarter.
      <br />
      Interview better.
    </h2>


    {/* Description */}

    <p
      style={{
        fontSize: "17px",
        lineHeight: "1.6",
        color: "#4b5563",
        marginBottom: "30px"
      }}
    >
      Your AI-powered career preparation
      companion.
    </p>


    {/* Features */}

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        marginBottom: "40px"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#374151"
        }}
      >
        <span
          style={{
            color: "#4f46e5",
            fontSize: "18px"
          }}
        >
          ✓
        </span>

        <span>
          AI Resume Analysis
        </span>
      </div>


      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#374151"
        }}
      >
        <span
          style={{
            color: "#4f46e5",
            fontSize: "18px"
          }}
        >
          ✓
        </span>

        <span>
          AI Mock Interviews
        </span>
      </div>


      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#374151"
        }}
      >
        <span
          style={{
            color: "#4f46e5",
            fontSize: "18px"
          }}
        >
          ✓
        </span>

        <span>
          Personalized Feedback
        </span>
      </div>

    </div>


    {/* AI Interviewer */}

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "18px",
        width: "fit-content",
        background: "rgba(255,255,255,0.65)",
        borderRadius: "18px",
        boxShadow:
          "0 8px 25px rgba(79,70,229,0.10)"
      }}
    >

      <div
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          overflow: "hidden",
          background: "#eef2ff"
        }}
      >

        <img
          src={aiInterviewer}
          alt="AI Interviewer"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

      </div>


      <div>

        <p
          style={{
            margin: "0 0 4px 0",
            fontWeight: "600",
            color: "#111827"
          }}
        >
          AI Interviewer
        </p>

        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#6b7280"
          }}
        >
          Practice. Improve. Succeed.
        </p>

      </div>

    </div>

  </div>
</div>


      {/* RIGHT SIDE */}

     {/* RIGHT SIDE */}

<div
  className="login-right"
  style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px"
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.08)"
          }}
        >

          <h1>
            Welcome Back 👋
          </h1>

          <p
            style={{
              color: "#6b7280"
            }}
          >
            Sign in to continue to SkillPilot.
          </p>


          <form onSubmit={handleLogin}>

  {/* Email */}

  <div style={{ marginTop: "30px", marginBottom: "22px" }}>

    <label
      style={{
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151"
      }}
    >
      Email Address
    </label>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onFocus={(e) => {
  e.target.style.borderColor = "#4f46e5";
  e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.10)";
}}
onBlur={(e) => {
  e.target.style.borderColor = "#d1d5db";
  e.target.style.boxShadow = "none";
}}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "14px 15px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        outline: "none",
        fontSize: "15px",
        color: "#111827",
        background: "#ffffff"
      }}
    />

  </div>


  {/* Password */}

  <div style={{ marginBottom: "28px" }}>

    <label
      style={{
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151"
      }}
    >
      Password
    </label>

    <div style={{ position: "relative" }}>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "100%",
      boxSizing: "border-box",
      padding: "14px 48px 14px 15px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      outline: "none",
      fontSize: "15px",
      color: "#111827",
      background: "#ffffff"
    }}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "18px",
      color: "#6b7280",
      padding: "4px"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>

</div>

  </div>
{error && (
  <div
    style={{
      marginBottom: "18px",
      padding: "12px 14px",
      borderRadius: "8px",
      background: "#fef2f2",
      color: "#dc2626",
      fontSize: "14px",
      border: "1px solid #fecaca"
    }}
  >
    {error}
  </div>
)}

  {/* Sign In */}

 <button
  type="submit"
  disabled={loading}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: loading ? "#818cf8" : "#4f46e5",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    boxShadow: "0 4px 12px rgba(79,70,229,0.25)"
  }}
>
  {loading ? "Signing In..." : "Sign In"}
</button>

</form>
<div
  style={{
    textAlign: "center",
    marginTop: "24px",
    fontSize: "14px",
    color: "#6b7280"
  }}
>
  Don't have an account?{" "}

  <button
    type="button"
    onClick={() => navigate("/register")}
    style={{
      border: "none",
      background: "transparent",
      color: "#4f46e5",
      fontWeight: "600",
      cursor: "pointer",
      padding: 0,
      fontSize: "14px"
    }}
  >
    Create an account
  </button>
</div>

        </div>

      </div>

    </div>
  );
}
export default Login;