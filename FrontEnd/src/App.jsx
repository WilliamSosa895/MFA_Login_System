import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Otp from "./containers/Otp";
import Dashboard from "./containers/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2 style={{ padding: 24 }}>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
