import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { fetchCategoryStats, fetchTopMembers } from "../../services/authService";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const user_role = localStorage.getItem("user_role");
  
  const token = localStorage.getItem("access_token");
  console.log("token ", token);
  
  const [stats, setStats] = useState({
    total_members: 0,
    monthly_income: 0,
    late_members: 0,
  });

  const [categoryStats, setCategoryStats] = useState([]);
  const [topMembers, setTopMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const formateur = new Intl.NumberFormat('fr-FR');
  const loadStats = async () => {
    setLoading(true);

    try {
      const [catData, topData] = await Promise.all([
        fetchCategoryStats(),
        fetchTopMembers()
      ]);

      setCategoryStats(catData);
      setTopMembers(topData);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    
    
    api.get("/finances/dashboard/")
      .then(res => setStats(res.data))
      .catch(console.error);

      loadStats();
     
  }, []);

  return (
    <DashboardLayout role={user_role || ""} username={user.username}>
      <h2 className="text-2xl font-bold mb-6">
        Tableau de bord
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-black" title="Membres" value={stats.total_members} />
        <Card title="Cotisations du mois" value={`${formateur.format(stats.monthly_income)} FCFA`} />
        <Card title="Retards paiement" value={stats.late_members} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">
            Cotisations par catégorie
          </h2>

              <table className="w-full">

                <thead className="bg-sky-900 text-white">
                  <tr>
                    <th className="p-2">Catégorie</th>
                    <th className="p-2">Budget</th>
                    <th className="p-2">Montant cotisé</th>
                    <th className="p-2">Restant</th>
                  </tr>
                </thead>

                <tbody>
                  {categoryStats.map((item: any, index) => (
                    <tr key={index} className="border-b border-gray-300 text-center">
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{formateur.format(item.total_topaid)} FCFA</td>
                      <td className="p-2">{formateur.format(item.total_paid)} FCFA</td>
                      {item.remaining>0?
                        <td className="p-2 font-bold text-red-500">
                        {formateur.format(-item.remaining)} FCFA
                        </td>:
                        <td className="p-2 font-bold text-green-500">
                        +{formateur.format(-(item.remaining))} FCFA
                      </td>
                    }
                      
                    </tr>
                  ))}
                </tbody>

              </table>
        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">
            Top 5 des cotisants
          </h2>

          <table className="w-full">

            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-2 text-left">Rang</th>
                <th className="p-2">Membre</th>
                <th className="p-2">Total cotisé</th>
              </tr>
            </thead>

            <tbody>
              {topMembers.map((item: any, index) => (
                <tr key={index} className="border-b border-gray-300 ">
                  <td className="p-2 text-left">{index+1==1?index+1+"er":index+1+"ème"}</td>
                  <td className="p-2 text-center">{item.name}</td>
                  <td className="p-2 text-center font-bold">{formateur.format(item.total)} FCFA</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
      
    </DashboardLayout>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white shadow rounded p-6">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
