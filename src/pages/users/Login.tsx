import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { fetchCurrentUser } from "../../services/authService";


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/token/", form);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      
  
      // endpoint Django JWT
      const user = await fetchCurrentUser();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        localStorage.setItem("user", JSON.stringify(user));

      
      
      const r = await api.get("/roles/my_role/")
    
      localStorage.setItem("user_role", r.data.name);
      const user_role = localStorage.getItem("user_role");

      
      if (user_role === "Admin") {
        navigate("/dashboard/admin");
      } else if (user_role === "Trésorié") {
        navigate("/dashboard/treasurer");
      } else {
        navigate("/dashboard/member");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Username ou mot de passe incorrect");
    }
  };

  return (
   
    <div className="flex bg-white items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-sky-800 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-[30px] text-white font-bold text-center">Connexion</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full bg-sky-50 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full bg-sky-50 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-stone-950 text-white p-2 rounded"
        >
          Se connecter
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Pas encore de compte ?
          </p>

          <Link
            to="/register"
            className="inline-block mt-2 text-black font-semibold hover:text-blue-800 transition"
          >
            Créer un compte →
          </Link>
        </div>
      </form>
    </div>
  );
}
