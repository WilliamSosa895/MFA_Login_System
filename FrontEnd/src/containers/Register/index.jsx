import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/FormField";
import Spinner from "../../components/Spinner";
import { registerUser } from "../../services/authService";

const initial = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

export default function Register() {
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
    if (!form.firstName.trim()) e.firstName = "Nombre requerido";
    if (!form.lastName.trim()) e.lastName = "Apellidos requeridos";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (!form.confirmPassword) {
      e.confirmPassword = "Confirma tu contraseña";
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Las contraseñas no coinciden";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerMsg("");
    try {
      await registerUser({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });
      setServerMsg("Registro exitoso. Por favor, inicia sesión.");
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      const msg = error?.response?.data?.message || "Error en el registro";
      setServerMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Crear cuenta</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Nombre" name="firstName" value={form.firstName} onChange={onChange} error={errors.firstName} />
        <FormField label="Apellidos" name="lastName" value={form.lastName} onChange={onChange} error={errors.lastName} />
        <FormField label="Correo" name="email" value={form.email} onChange={onChange} error={errors.email} />
        <FormField label="Contraseña" type="password" name="password" value={form.password} onChange={onChange} error={errors.password} />
        <FormField label="Confirmar Contraseña" type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} error={errors.confirmPassword} />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Registrarme"}
        </button>
      </form>
      {serverMsg && <p className="msg">{serverMsg}</p>}
      <p className="muted">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}
