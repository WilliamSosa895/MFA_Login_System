import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { verifyOtp, resendOtp } from "../../services/authService";

export default function Otp() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!email) navigate("/login", { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerId);
            setCanResend(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [canResend, timeLeft]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!/^\d{4,8}$/.test(code)) {
      setServerMsg("Ingresa el código numérico enviado a tu correo.");
      return;
    }
    setLoading(true);
    setServerMsg("");
    try {
      const data = await verifyOtp({ email, code });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        sessionStorage.removeItem("email");
        navigate("/dashboard", { replace: true });
      } else {
        setServerMsg("Código inválido o expirado.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "No se pudo verificar el código";
      setServerMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setLoading(true);
    setServerMsg("");
    try {
      await resendOtp({ email });
      setTimeLeft(60);
      setCanResend(false);
      setServerMsg("Se ha enviado un nuevo código a tu correo.");
    } catch (err) {
      const msg = err?.response?.data?.message || "No se pudo reenviar el código";
      setServerMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Verificación OTP</h1>
      <p className="muted">Hemos enviado un código a tu correo.</p>
      <form onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          inputMode="numeric"
          maxLength={8}
          placeholder="Ingresa tu código"
          value={code}
          onChange={(e) => setCode(e.target.value.trim())}
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Verificar"}
        </button>
      </form>
      {serverMsg && <p className="msg">{serverMsg}</p>}
      <p className="muted">
        {canResend ? (
          <button type="button" className="btn" style={{ marginTop: '8px' }} onClick={handleResend} disabled={loading}>
            {loading ? <Spinner /> : "Reenviar código"}
          </button>
        ) : (
          <>Reenviar código en {timeLeft}s</>
        )}
      </p>
      <p className="muted">
        ¿Problemas? <Link to="/login">Volver a iniciar sesión</Link>
      </p>
    </div>
  );
}
