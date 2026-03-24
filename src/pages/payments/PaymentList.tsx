import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fetchTransaction } from "../../services/authService";


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

export default function PaymentList() {
  const [members, setMembers] = useState<TransactionType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user_role = localStorage.getItem("user_role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  

  const loadMembers = async (pageNumber  = 1) => {
    const data = await fetchTransaction(pageNumber);
    console.log(data.results)
    setMembers(data.results);
    setTotalPages(Math.ceil(data.count / 10));
    
  };

  useEffect(() => {
    loadMembers(page);
  }, [page]);

  const filteredUsers = members.filter((mem) =>
    `${mem.user_detail?.username} ${mem.user_detail?.phone} ${mem.category_detail?.name}`
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
    
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Liste des paiements
        </h1>

        <div className="flex gap-3">

            {/* SEARCH */}
              <input
                type="text"
                placeholder="Rechercher membre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              

            </div>
        </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full w-full text-sm text-center rtl:text-right text-body">
          <thead className="text-sm text-white text-body bg-sky-950 border-default-medium">
            <tr>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Contact</th>
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

                <th scope="row" className="flex items-center px-6 py-4 text-heading whitespace-nowrap">
                  <img className="w-5 h-5 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
                    <div className="ps-3">
                      <div className="text-base font-semibold">{m.user_detail?.username} {m.user_detail?.last_name}</div>
                      <div className="font-normal text-body"></div>
                    </div>  
                </th>
               
                <td className="px-4 py-2 ">{m.user_detail?.phone}</td>

                
                <td className="px-4 py-2">
                  {m.category_detail?.name}
                </td>
                <td className="px-4 py-2">
                  {m.amount}
                </td>
                
                <td className="px-4 py-2">
                  {(m.category_detail?.amount_per_member ? m.category_detail?.amount_per_member : 0) - (m.amount ? m.amount:0) }
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
    </DashboardLayout>
  );
}
