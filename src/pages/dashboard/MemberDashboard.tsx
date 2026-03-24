import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function MemberDashboard() {

  const token = localStorage.getItem("access_token");
  const user_role = localStorage.getItem("user_role") || "";
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  const [profile, setProfile] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);

  const loadData = async () => {
    const p = await api.get("/users/me/");
   
    setProfile(p.data);

    const pay = await api.get("/membership-payments/own/");
    setPayments(pay.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!profile) return <div>Chargement...</div>;

  return (
    <DashboardLayout role={user_role} username={profile.username}>
      <div className="p-6 space-y-6">
        <div className="bg-white p-4 shadow rounded">
          <h1 className="text-xl font-bold">
            {profile.username} 
          </h1>

          <p>Téléphone : {profile.phone}</p>
          <p>Solde restant : {profile.balance}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold mb-2">
            Mes paiements
          </h2>

          <ul>
            {payments.map((p) => (
              <li key={p.id}>
                {p.date} — {p.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
