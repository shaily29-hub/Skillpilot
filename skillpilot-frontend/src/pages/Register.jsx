import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
const navigate = useNavigate();
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  setError("");

  if (!name || !email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {

    await registerUser({
      name,
      email,
      password
    });

    alert("Registered Successfully");

  } catch (error) {

    console.log(error);

    setError("Registration Failed. Please try again.");

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

        <h2
          style={{
            fontSize: "42px",
            lineHeight: "1.15",
            margin: "0 0 20px 0",
            color: "#111827"
          }}
        >
          Start your journey.
          <br />
          Build your future.
        </h2>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.6",
            color: "#4b5563",
            marginBottom: "30px"
          }}
        >
          Create your SkillPilot account and
          start preparing smarter with AI.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px"
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
              Analyze your resume with AI
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
              Practice realistic AI interviews
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
              Get personalized feedback
            </span>
          </div>

        </div>

      </div>

    </div>


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

        <h1
          style={{
            marginBottom: "8px",
            color: "#111827"
          }}
        >
          Create Account ✨
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginTop: 0
          }}
        >
          Join SkillPilot and start preparing for your next opportunity.
        </p>


        <form onSubmit={handleRegister}>

          {/* NAME */}

          <div
            style={{
              marginTop: "28px",
              marginBottom: "20px"
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151"
              }}
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 15px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "15px"
              }}
            />

          </div>


          {/* EMAIL */}

          <div
            style={{
              marginBottom: "20px"
            }}
          >

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
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 15px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "15px"
              }}
            />

          </div>


          {/* PASSWORD */}

          <div
            style={{
              marginBottom: "25px"
            }}
          >

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px 48px 14px 15px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  fontSize: "15px"
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
                  fontSize: "18px"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>


          {/* ERROR */}

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


          {/* REGISTER BUTTON */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: loading ? "#818cf8" : "#4f46e5",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow:
                "0 4px 12px rgba(79,70,229,0.25)"
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>


        {/* LOGIN LINK */}

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
            color: "#6b7280"
          }}
        >
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
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
            Sign in
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default Register;