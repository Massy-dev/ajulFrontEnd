import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fetchCategorie } from "../../services/authService";

type Category = {
  id:number;
  name: string;
  description: string;
  total_amount: number;
  amount_per_member: number;
}


export default function CategoryList() {
  const [category, setCategory] = useState<Category[]>([]);
  const user_role = localStorage.getItem("user_role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1); 
  const [page, setPage] = useState(1);


  const loadCategorie = async (pageNumber  = 1) => {
    const data = await fetchCategorie(pageNumber);
    setCategory(data.results);
    setTotalPages(Math.ceil(data.count / 10));
    
  };

  // Fetch users
  useEffect(() => {
    loadCategorie(page);
  }, [page]);



  // Supprimer un utilisateur
  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cette categorie ?")) return;
    try {
      await api.delete(`/categories/${id}/`);
      setCategory(category.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = category.filter((cate) =>
    `${cate.name} ${cate.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  

  return (
    <DashboardLayout role={user_role || ""} username={user.username}>
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        
        <h1 className="text-2xl font-bold text-gray-800">Liste categorie cotisation</h1>
        <div className="flex gap-3">

          {/* SEARCH */}
            <input
              type="text"
              placeholder="Rechercher membre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* ADD BUTTON */}
            <Link
              to="/category/new"
              className="bg-blue-800 text-bold flex items-center gap-3 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
            >
              Ajouter une categorie
            </Link>

          </div>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full w-full text-sm text-center rtl:text-right text-body">
          <thead className="text-sm text-white text-body bg-sky-950 border-default-medium">
            <tr className="">
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium">Montant global</th>
              <th className="px-6 py-3 font-medium">Montant par membre</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((cat) => (
              <tr key={cat.id} className="bg-white border-b border-gray-300 hover:bg-sky-950 hover:text-white">
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2">{cat.description}</td>
                <td className="px-4 py-2">{cat.total_amount}</td>
                <td className="px-4 py-2">{cat.amount_per_member}</td>
                
                <td className="px-4 py-2 text-center space-x-2">
                  <Link
                    to={`/category/${cat.id}/edit`}
                    className="text-blue-600 hover:text-blue-300 text-sm font-medium"
                  >
                    Modifier
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-300 text-sm font-medium"
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
