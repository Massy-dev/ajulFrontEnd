import { useNavigate } from "react-router-dom";

//import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
       
      {/* HERO <Navbar />*/}
      <section className="flex-1 bg-gradient-to-br from-blue-900 to-black text-white flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Plateforme AJUL
        </h1>

        <p className="text-gray-300 max-w-xl mb-10">
          Association des jeunes unis de LAWA.
        </p>

        <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() => navigate("/visitor")}
            className="bg-white text-blue-900 py-3 rounded-lg font-semibold hover:scale-105 transition shadow"
          >
            Je suis visiteur
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition shadow"
          >
            Je suis membre
          </button>
        </div>
      </section>

      
    </div>
  );
}



