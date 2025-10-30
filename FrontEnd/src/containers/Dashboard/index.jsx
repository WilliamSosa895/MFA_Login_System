import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }
  return (
    <div className="card">
      <h1>¡Acceso exitoso! 🎉</h1>
      <p>Has iniciado sesión con MFA.</p>
      <button className="btn" onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
