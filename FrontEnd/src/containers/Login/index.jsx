import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/FormField";
import Spinner from "../../components/Spinner";
import { loginUser } from "../../services/authService";

const initial = { email: "", password: "" };

export default function Login() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido";
    if (!form.password) e.password = "Contraseña requerida";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerMsg("");
    try {
      const data = await loginUser({ email: form.email, password: form.password });
      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard", { replace: true });
      } else {
        sessionStorage.setItem("email", form.email);
        navigate("/verify-otp", { replace: true });
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Credenciales inválidas";
      setServerMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Iniciar sesión</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Correo" name="email" value={form.email} onChange={onChange} error={errors.email} />
        <FormField label="Contraseña" type="password" name="password" value={form.password} onChange={onChange} error={errors.password} />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Entrar"}
        </button>
      </form>
      {serverMsg && <p className="msg">{serverMsg}</p>}
      <p className="muted">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}
