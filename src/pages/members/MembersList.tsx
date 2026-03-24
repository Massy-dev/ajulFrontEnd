import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

type Member = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
};

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const res = await api.get<Member[]>("/members/");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce membre ?")) return;

    await api.delete(`/members/${id}/`);
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Membres</h1>

        <Link
          to="/members/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nouveau membre
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Téléphone</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">
                {m.first_name} {m.last_name}
              </td>
              <td className="p-2">{m.phone}</td>
              <td className="p-2">{m.email || "-"}</td>

              <td className="p-2 space-x-3">
                <Link
                  to={`/members/${m.id}/edit`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
