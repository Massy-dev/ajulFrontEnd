import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

type RegisterForm = {
  username: string;
  last_name: string;
  phone: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    username: "",
    last_name: "",
    phone: "",
    password: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     Handle input
  ========================= */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     Handle file
  ========================= */

  const handleFile = (file: File) => {
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
     Submit
  ========================= */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("username", form.username);
    formData.append("last_name", form.last_name);
    formData.append("phone", form.phone);
    formData.append("password", form.password);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await api.post("/users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/login");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-6">
          Créer un compte
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="username"
            placeholder="Prénom"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="last_name"
            placeholder="Nom"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="phone"
            placeholder="Téléphone"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="input"
            required
          />

          {/* Photo */}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            {loading ? "Création..." : "S’inscrire"}
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">
              Déjà un compte ?{" "}
            </span>

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </div>
        </form>

      </div>

    </div>
  );
}