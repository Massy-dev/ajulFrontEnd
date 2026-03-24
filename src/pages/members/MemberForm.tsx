import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function MemberForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const fetchMember = async () => {
    const res = await api.get(`/members/${id}/`);
    setForm(res.data);
  };

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      await api.put(`/members/${id}/`, form);
    } else {
      await api.post("/members/", form);
    }

    navigate("/members");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Modifier" : "Créer"} membre
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="first_name"
          placeholder="Prénom"
          value={form.first_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="last_name"
          placeholder="Nom"
          value={form.last_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="phone"
          placeholder="Téléphone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
