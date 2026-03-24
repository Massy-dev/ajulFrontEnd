import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { fetchCategorie } from "../../services/authService";




export default function CategoryForm() {

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const user_role = localStorage.getItem("user_role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if(!token){
    navigate("/login");
  }
  
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [total_amount, setTotalAmount] = useState("")
  const [amount_per_member, setAmountPerMember] = useState("")

  useEffect(() => {

    const loadData = async () => {

      try {

        if (id) {
          const userRes = await api.get(`/categories/${id}/`);

            setName(userRes.data.name);
            setDescription(userRes.data.description);
            setTotalAmount(userRes.data.total_amount);
            setAmountPerMember(userRes.data.amount_per_member); 
        }

      } catch (error) {
        console.error(error);
      }

    };

    loadData();

  }, [id]);
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/categories/", {
      name,
      description,
      total_amount,
      amount_per_member

    });

    navigate("/category");
  };

  return (
    <DashboardLayout role={user_role || ""} username={user.username}>
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        Ajouter une catégorie de cotisation
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

      <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border block w-full rounded-md bg-white/5 px-3 py-2 text-base text-sky-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />

      <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border block w-full rounded-md bg-white/5 px-3 py-2 text-base text-sky-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
        <input
          type="number"
          placeholder="Montant total"
          value={total_amount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className="border block w-full rounded-md bg-white/5 px-3 py-2 text-base text-sky-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          required
        />

      <input
          type="number"
          placeholder="Montant par membre"
          value={amount_per_member}
          onChange={(e) => setAmountPerMember(e.target.value)}
          className="border block w-full rounded-md bg-white/5 px-3 py-2 text-base text-sky-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          required
        />

       
         

        <button
          type="submit"
          className="bg-emerald-600 text-white box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
        >
          Enregistrer
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}
