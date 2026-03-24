import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Wallet,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

type Props = {
  role: string;
};

export default function Sidebar({ role }: Props) {
  const [open, setOpen] = useState(false);
  

  return (
    <>
      {/* Bouton mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
      >
        <Menu size={20} />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50
          w-64 bg-gray-800 text-white
          min-h-screen p-4
          transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">AJUL Gestion</h2>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-2">

          <NavLink to="/dashboard/admin" className=
          {({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-white text-sky-950 font-bold"
                : "text-white hover:bg-gray-100 hover:text-sky-950"
            }`
          }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* ADMIN */}
          {role === "Admin" && (
            <>

              <NavLink to="/users" className=
              {({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-sky-950 font-bold"
                    : "text-white hover:bg-gray-100 hover:text-sky-950"
                }`
              }
              >
                <Users size={18} />
                Membres
              </NavLink>
            </>
          )}

          {/* FINANCE */}
          {(role === "Admin" || role === "Trésorié") && (
            <>
            <NavLink to="/category" className=
            {({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white text-sky-950 font-bold"
                  : "text-white hover:bg-gray-100 hover:text-sky-950"
              }`
            }
            >
                <CreditCard size={18} />
                Categories
              </NavLink>

              <NavLink to="/payments/dashboard" className=
              {({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-sky-950 font-bold"
                    : "text-white hover:bg-gray-100 hover:text-sky-950"
                }`
              }
              >
                <Wallet size={18} />
                Paiements
              </NavLink>

              
            </>
          )}

          {/* MEMBRE */}
          {role === "Membre" && (
            <NavLink to="/profile" className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white text-sky-950 font-bold"
                  : "text-white hover:bg-gray-100 hover:text-sky-950"
              }`
            }
            >
              <User size={18} />
              Mon profil
            </NavLink>
          )}
        </nav>
      </div>
    </>
  );
}
