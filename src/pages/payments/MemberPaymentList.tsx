import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fetchMemberTransaction, fetchTotal } from "../../services/authService";
import PaymentFormModal from "./PaymentFormModal";


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

export default function MemberPaymentList() {
  const { id } = useParams();
  const [members, setMembers] = useState<TransactionType[]>([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);
  const user_role = localStorage.getItem("user_role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isOpen, setIsOpen] = useState(false);
  

  const loadTransaction = async (pageNumber  = 1) => {
    if(!id) return;
    setLoading(true);
    const formateur = new Intl.NumberFormat('fr-FR');
    try{
      const data = await fetchMemberTransaction(pageNumber, Number(id));
    const totalData = await fetchTotal(Number(id));
    
    
    setTotal(formateur.format(totalData));
    setMembers(data);
    
    setLastName(data[0].user_detail.last_name);
    setName(data[0].user_detail.username)
    setPhone(data[0].user_detail.phone);
   
    setTotalPages(Math.ceil(data.length / 10));
    }catch (err){
      console.error(err);
    }finally{
      setLoading(false)
    }
  
  };

  useEffect(() => {
    loadTransaction(page);
  }, [page]);

  const filteredUsers = members.filter((mem) =>
    `${mem.category_detail?.name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  
   // Supprimer une transaction
   const handleDelete = async (id: number) => {
    
    if (!window.confirm("Supprimer cette transaction ?")) return;
    try {
      await api.delete(`/transactions/${id}/`);
      setMembers(members.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <DashboardLayout role={user_role || ""} username={user.username}>
    
    {isOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">

      {/* Bouton fermer */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-gray-500"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4">Ajouter paiement</h2>

      <PaymentFormModal
        userId={Number(id)}
        onSuccess={() => {
          setIsOpen(false);
          loadTransaction(); // refresh automatique
        }}
      />

    </div>
  </div>
)}
    
    
    
    {loading ? (
    <div className="text-center py-10">Chargement...</div>
  ) : (
    <>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="text-2xl font-bold ">
            <h1>{lastname} {name}</h1>
            <span className="mb-4 text-base text-gray-600">
              Contact : {phone}
            </span><br/>
            <span className="mb-4 text-xl text-gray-600" >
              Total cotisé : {total} FCFA
            </span> 
            
          </div>
          
         

          <div className="flex gap-3">

              {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Rechercher cotisation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-4 py-2 rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Ajouter paiement
          </button>

          </div>
          </div>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full w-full text-sm text-center rtl:text-right text-body">
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
              {filteredUsers.map((m) => (
                <tr key={m.id} className="bg-white border-b border-gray-300 hover:bg-sky-950 hover:text-white">
                  
                  <td className="px-4 py-2">
                    {m.created_at}
                  </td>

                  
                
      

                  
                  <td className="px-4 py-2">
                    {m.category_detail?.name}
                  </td>
                  <td className="px-4 py-2">
                    {m.amount}
                  </td>
                  
                  <td className="px-4 py-2">
                    {-((m.category_detail?.amount_per_member 
                      ? m.category_detail?.amount_per_member 
                      : 0) - ((m.amount? m.amount:0))) }
                  </td>
                  
                  <td className="flex px-4 py-2 items-center justify-center gap-3">
                      <Link
                        to={`/payment/${m.id}/edit`}
                        className="text-green-600 hover:text-blue-300 text-sm font-medium"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                      Supprimer
                    </button>
                      
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center gap-1 mt-4">

              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 border rounded"
                >
                Précédent
              </button>

              {[...Array(totalPages)].map((_, i) => (

              <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                  page === i + 1
                  ? "bg-blue-800 text-white"
                  : "border"
                  }`}
                  >
                  {i + 1}

              </button>

              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-3 py-1 border rounded"
                >
                Suivant
              </button>

          </div>
      </div>
    </div>
    </>
    )}
    </DashboardLayout>
  );
}
