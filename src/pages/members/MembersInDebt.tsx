import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function MembersInDebt() {
  const [members, setMembers] = useState<any[]>([]);

  const loadMembers = async () => {
    const res = await api.get("/members/in-debt/");
    setMembers(res.data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Membres en retard de paiement
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Téléphone</th>
            <th className="p-2">Dette</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">
                <Link
                  to={`/members/${m.id}`}
                  className="text-blue-600"
                >
                  {m.first_name} {m.last_name}
                </Link>
              </td>
              <td className="p-2">{m.phone}</td>
              <td className="p-2 font-bold text-red-600">
                {m.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
