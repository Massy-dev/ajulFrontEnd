import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fetchCategorie } from "../../services/authService";


type Params = {
  id?: string; // id optionnel pour création / édition
};


type Category = {
  id: string;
  name: string;
}

type PaiementForm = {

}

export default function PaymentForm() {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const user_role = localStorage.getItem("user_role");
  const username = localStorage.getItem("usernames") || "";

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCate] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1);

  const loadCategorie = async (pageNumber  = 1) => {
    const data = await fetchCategorie(pageNumber);
    setCategories(data.results);
  };

   // Fetch user si edition
   useEffect(() => {
    
    loadCategorie(page);
    
  },);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await api.post("/transactions/", {
      user: id,
      amount,
      description,
      category,
    });
    
    navigate(`/users`);
    //navigate(`/members/${id}/payment`);
  };

  return (
    <DashboardLayout role={user_role || ""} username={username}>
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        Ajouter un paiement
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
         <select
            value={category}
            onChange={(e) => 
              setCate(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full p-2 border rounded"
          > 
          <option value="">Choisir la cotisation</option>
            {categories.map((cat)=>(
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Enregistrer paiement
        </button>
      </form>
    </div>

    
    </DashboardLayout>
  );
}
