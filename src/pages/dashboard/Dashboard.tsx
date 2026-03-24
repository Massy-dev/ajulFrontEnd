import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  const loadDashboard = async () => {
    const res = await api.get("/finances/dashboard/");
    setData(res.data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data) return <div>Chargement...</div>;

  return (
    <div className="p-6 grid md:grid-cols-4 gap-4">
      <Card title="Total encaissé" value={data.total_payments} />
      <Card title="Dettes membres" value={data.total_balance} />
      <Card title="Nombre membres" value={data.members_count} />
      <Card title="Paiements du mois" value={data.monthly_payments} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
