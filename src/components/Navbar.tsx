import { useNavigate } from "react-router-dom";
//import logo from "../assets/ajul-logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="{logo}" alt="AJUL" className="h-10" />
        <span className="font-bold text-lg">AJUL</span>
      </div>

      <div className="flex gap-6 text-sm">
        <button onClick={() => navigate("/login")} className="hover:text-blue-400">
          Connexion
        </button>
      </div>
    </nav>
  );
}
