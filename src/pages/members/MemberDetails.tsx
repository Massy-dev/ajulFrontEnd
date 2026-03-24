import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

type Member = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  balance: number;
};

type Payment = {
  id: number;
  amount: number;
  date: string;
  description?: string;
};

export default function MemberDetails() {
  const { id } = useParams();
  const user_role = localStorage.getItem("user_role");
  const username = localStorage.getItem("usernames") || "";
  const [member, setMember] = useState<Member | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  const fetchMember = async () => {
    const res = await api.get(`/users/${id}/`);
    setMember(res.data);
  };

  const fetchPayments = async () => {
    const res = await api.get(`/membership-fees/${id}/`);
    setPayments(res.data);
    
  };

  useEffect(() => {
    fetchMember();
    fetchPayments();
  }, [id]);

  if (!member) return <div>Chargement...</div>;

  return (
    <DashboardLayout role={user_role || ""} username={username}>
      <div className="p-6 space-y-6">
        {/* Infos membre */}
        <div className="bg-white p-4 shadow rounded">
          <h1 className="text-2xl font-bold">
            {member.first_name} {member.last_name}
          </h1>

          <p>Téléphone : {member.phone}</p>
          <p>Email : {member.email || "-"}</p>
          <p className="font-semibold">
            Solde restant : {member.balance}
          </p>
          <Link
            to={`/members/${id}/edit`}
            className="text-blue-600 mt-2 inline-block"
          >
            Modifier
          </Link>
        </div>

        {/* Paiements */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-semibold">
              Historique des paiements
            </h2>

            <Link
              to={`/members/${id}/payment`}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Ajouter paiement
            </Link>
          </div>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Montant</th>
                <th className="p-2">Description</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">{p.amount}</td>
                  <td className="p-2">{p.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </DashboardLayout>
  );
}
