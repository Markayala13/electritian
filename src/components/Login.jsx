import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cambia estos valores por los que tú quieras
    if (user === "chicho" && pass === "123") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-20 p-6 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Zona Privada</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={e => setUser(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={e => setPass(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="bg-[#FFD700] text-[#23272F] font-bold py-2 rounded hover:bg-[#00BFA6] hover:text-white transition">
        Entrar
      </button>
    </form>
  );
}