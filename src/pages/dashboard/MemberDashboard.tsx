import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Navigate, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";


type TransactionType = {
  id: number;
  amount: number;
  description: string;
  created_at:string;
  user_detail: {
    username:string,
    last_name:string,
    phone:string
  };
  category_detail:{
    name:string,
    amount_per_member:number
  } 
};

export default function MemberDashboard() {

  const token = localStorage.getItem("access_token");
  const user_role = localStorage.getItem("user_role") || "";
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  const [profile, setProfile] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const formateur = new Intl.NumberFormat('fr-FR');
  const loadData = async () => {
    setLoading(true);
    
    try{
    const p = await api.get("/users/user_me/");
   
    setProfile(p.data);

    const pay = await api.get("/membership-payments/own/");
    setPayments(pay.data);

    }catch (err){
      console.error(err);
    }finally{
      setLoading(false)
    }

  };

  useEffect(() => {
    loadData();
  }, []);

  // Supprimer une transaction
  const handleDelete = async (id: number) => {
    
    if (!window.confirm("Supprimer cette transaction ?")) return;
    try {
      await api.delete(`/transactions/${id}/`);
      setTransaction(transaction.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };


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

          
          {loading ? (
          <div className="text-center py-10">Chargement...</div>
        ) : (
          <>
        <div className="py-5">
             
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm text-center rtl:text-right text-body">
            <thead className="text-sm text-white text-body bg-sky-950 border-default-medium">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                
                <th className="px-6 py-3 font-medium">Categorie</th>
                <th className="px-6 py-3 font-medium">Montant payé</th>
                <th className="px-6 py-3 font-medium">Reste</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="bg-white border-b border-gray-300 hover:bg-sky-950 hover:text-white">
                  
                <td className="px-4 py-2">
                  {p.created_at}
                </td>

                
              
    

                
                <td className="px-4 py-2">
                  {p.category_detail?.name}
                </td>
                <td className="px-4 py-2">
                  {formateur.format(p.amount)}
                </td>
                
                <td className="px-4 py-2">
                  {formateur.format(-(((p.category_detail?.amount_per_member 
                    ? p.category_detail?.amount_per_member 
                    : 0) - ((p.amount? p.amount:0))))) }
                </td>
                
                <td className="flex px-4 py-2 items-center justify-center gap-3">
                    <Link
                      to={`/payment/${p.id}/edit`}
                      className="text-green-600 hover:text-blue-300 text-sm font-medium"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                    Supprimer
                  </button>
                    
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
         
      </div>
    </div>
    </>
    )}


        </div>
      </div>
    </DashboardLayout>
  );
}
