import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { verifLogin, fetchUsers } from "../../services/authService";
import { UserPlusIcon } from "@heroicons/react/24/solid";



type UserType = {
  id: number;
  username: string;
  last_name: string;
  phone: string;
  photo:string,
  role_detail:{
    id: number;
    name:string;
  } 
};

export default function UsersList() {
  /* Redirecttion vers login si deconnecté*/
  verifLogin()

  const [users, setUsers] = useState<UserType[]>([]);
  const user_role = localStorage.getItem("user_role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  
 


  const loadMembers = async (pageNumber = 1) => {
    const data = await fetchUsers(pageNumber);
    setUsers(data.results);
    console.log(data.results)
    setTotalPages(Math.ceil(data.count / 10));
    
  };


  // Fetch users
  useEffect(() => {
    loadMembers(page);
  }, [page]);


  // Supprimer un utilisateur
  const handleDelete = async (id: number) => {
    
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/users/${id}/`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.last_name} ${user.phone} ${user.role_detail.name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  
  return (
    <DashboardLayout role={user_role || ""} username={user.username}>

    
<div className="p-6">

{/* HEADER */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

    <h1 className="text-2xl font-bold text-gray-800">
      Membres AJUL
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

      {/* ADD BUTTON */}
      <Link
        to="/users/new"
        className="bg-blue-800 text-bold flex items-center gap-3 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter membre
      </Link>

    </div>

  </div>

{/* TABLE CONTAINER */}
  <div className="bg-white rounded-xl shadow overflow-hidden">

    <table className="w-full w-full text-sm text-center rtl:text-right text-body">

      {/* HEADER */}
      <thead className="text-sm text-white text-body bg-sky-950 border-default-medium">
        <tr>
          <th className="px-6 py-3 font-medium">Nom</th>
          <th className="px-6 py-3 font-medium">Contact</th>
          <th className="px-6 py-3 font-medium">Rôle</th>
          <th className="px-6 py-3 font-medium">Actions</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>

        {filteredUsers.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b border-gray-300 hover:bg-sky-950 hover:text-white"
          >
            
            <th scope="row" className="flex items-center px-6 py-4 text-heading whitespace-nowrap">
              <img className="w-8 h-8 object-cover rounded-full" src={user.photo} alt="AV"/>
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.username} {user.last_name}</div>
                  <div className="font-normal text-body"></div>
                </div>  
            </th>

          

            <td className="px-4 py-2">
              {user.phone}
            </td>

            <td className="px-4 py-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {user.role_detail.name}
              </span>
            </td>

            <td className="flex px-4 py-2 items-center justify-center gap-3">

              <Link
                to={`/users/${user.id}/edit`}
                className="px-4 py-5 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Modifier
              </Link>

              <Link
                to={`/members/${user.id}/payment`}
                className="px-1 py-3 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Paiements
              </Link>

              <button
                onClick={() => handleDelete(user.id)}
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
