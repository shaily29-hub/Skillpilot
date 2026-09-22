import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ResumeUpload from "./pages/ResumeUpload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeStatus from "./pages/ResumeStatus";
import JDMatch from "./pages/JDMatch";
import ResumeHistory from "./pages/ResumeHistory";
import MockInterview from "./pages/MockInterview";
import InterviewSession from "./pages/InterviewSession";
import InterviewReport from "./pages/InterviewReport";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/resume-upload"
  element={
    <ProtectedRoute>
      <ResumeUpload />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume-status/:id"
  element={
    <ProtectedRoute>
      <ResumeStatus />
    </ProtectedRoute>
  }
/>

<Route
  path="/jd-match"
  element={
    <ProtectedRoute>
      <JDMatch />
    </ProtectedRoute>
  }
/>

<Route
  path="/resume-history"
  element={
    <ProtectedRoute>
      <ResumeHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/mock-interview"
  element={
    <ProtectedRoute>
      <MockInterview />
    </ProtectedRoute>
  }
/>

<Route
  path="/mock-interview/:sessionId"
  element={
    <ProtectedRoute>
      <InterviewSession />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview-report/:sessionId"
  element={
    <ProtectedRoute>
      <InterviewReport />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;