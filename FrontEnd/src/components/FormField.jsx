export default function FormField({ label, type="text", value, onChange, name, placeholder, error }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <input
        className={`input ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="on"
      />
      {error ? <small className="error">{error}</small> : null}
    </div>
  );
}
