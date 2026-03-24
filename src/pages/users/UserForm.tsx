import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { verifLogin, fetchRole } from "../../services/authService";

type UserRole = {
  id: number;
  name: string;
};

type UserFormType = {
  username: string;
  last_name: string;
  phone: string;
  role: number;
  password?: string;
};

export default function UserForm() {

  verifLogin();

  const { id } = useParams();
  const navigate = useNavigate();

  const user_role = localStorage.getItem("user_role");
  const usernames = localStorage.getItem("usernames") || "";
  console.log(usernames)
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [form, setForm] = useState<UserFormType>({
    username: "",
    last_name: "",
    phone: "",
    role: 0,
    password: "",
  });

  /* =========================
     Load data
  ========================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const roleRes = await fetchRole(1);
        setRoles(roleRes.results);

        if (id) {
          const userRes = await api.get(`/users/${id}/`);

          setForm({
            username: userRes.data.username,
            last_name: userRes.data.last_name,
            phone: userRes.data.phone,
            role: userRes.data.role?.id || userRes.data.role,
            password: "",
          });

          if (userRes.data.photo) {
            setPreview(`${userRes.data.photo}`);
          }
        }

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [id]);

  /* =========================
     Handle input
  ========================= */

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value
    }));
  };

  /* =========================
     Handle file
  ========================= */

  const handleFile = (file: File) => {
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  /* =========================
     Submit
  ========================= */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", form.username);
    formData.append("last_name", form.last_name);
    formData.append("phone", form.phone);
    formData.append("role", String(form.role));

    if (!id && form.password) {
      formData.append("password", form.password);
    }

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      if (id) {
        await api.patch(`/users/${id}/`, formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        await api.post("/users/", formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
      });
      }

      navigate("/users");

    } catch (error) {
      console.error(error);
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <DashboardLayout role={user_role || ""} username={usernames}>

      <div className="flex justify-center p-10">

        <div className="bg-white w-full max-w-2xl shadow-xl p-8 rounded-2xl">

          <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
            {id ? "Modifier" : "Ajouter"} membre
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* INPUTS */}
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Prénom"
              className="input"
              required
            />

            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Nom"
              className="input"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Contact"
              className="input"
              required
            />

            {!id && (
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="input"
                required
              />
            )}

            {/* DRAG & DROP */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition 
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="fileUpload"
              />

              <label htmlFor="fileUpload" className="cursor-pointer">
                <p className="text-gray-600">
                  Glisser une image ici ou <span className="text-blue-600 font-semibold">cliquer</span>
                </p>
              </label>

              {preview && (
                <img
                  src={preview}
                  className="mt-4 w-24 h-24 rounded-full object-cover mx-auto shadow"
                />
              )}
            </div>

            {/* ROLE */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="input"
              required
            >
              <option value={0}>Sélectionnez un rôle</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {id ? "Modifier" : "Ajouter"}
            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>
  );
}