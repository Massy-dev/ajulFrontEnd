import { Link, Navigate } from "react-router-dom";

export default function Visitor() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
       {/* HERO FULLSCREEN */}
       <section className="relative h-screen w-full">

          {/* IMAGE BACKGROUND */}
          <img
            src="/plage.jpg" // 👉 mets ton image dans /public
            alt="Association"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Rejoignez une communauté <br />
              engagée et solidaire
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
              Suivez vos cotisations, participez aux activités et restez connecté
              avec votre association en toute simplicité.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Devenir membre
              </Link>

              <Link
                to="/login"
                className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Déjà membre ?
              </Link>

            </div>

          </div>

          </section>

      {/* TRUST */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl font-bold mb-6">
          Une gestion moderne et transparente
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Notre plateforme garantit un suivi clair des membres et des paiements,
          avec une sécurité renforcée et un accès simplifié.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Suivi des cotisations</h3>
          <p className="text-gray-600">
            Consultez vos paiements en temps réel et restez à jour.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Espace personnel sécurisé</h3>
          <p className="text-gray-600">
            Accédez à vos informations en toute sécurité.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Communication simplifiée</h3>
          <p className="text-gray-600">
            Restez informé des activités et annonces.
          </p>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-8">
          Comment ça marche ?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div>
            <div className="text-blue-600 font-bold text-xl">1</div>
            <p>Créez votre compte</p>
          </div>

          <div>
            <div className="text-blue-600 font-bold text-xl">2</div>
            <p>Rejoignez l’association</p>
          </div>

          <div>
            <div className="text-blue-600 font-bold text-xl">3</div>
            <p>Suivez vos activités</p>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à nous rejoindre ?
        </h2>

        <Link
          to="/register"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
        >
          Créer mon compte
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 - Plateforme de gestion associative
      </footer>

    </div>
  );
}