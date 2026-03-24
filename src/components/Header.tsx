import { LogOut, UserCircle } from "lucide-react";
import { logout } from "../services/authService";

type Props = {
  username: string;
  role: string;
};

export default function Header({ username, role }: Props) {
 



  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-lg">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserCircle size={24} />
          <div className="text-sm">
            <p className="font-medium">{username}</p>
            <p className="text-gray-500 capitalize">{role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
