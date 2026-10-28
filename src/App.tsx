
import { Link, NavLink, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import NotFoundPage from "./pages/NotFoundPage";

// Navbaren syns på alla sidor, under den byts sidan ut beroende på adressen.
function App() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-emerald-900 text-white shadow-md">
        <nav
          aria-label="Huvudnavigation"
          className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4"
        >
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg text-xl font-extrabold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span aria-hidden="true">🌍</span>
            Reseapp
          </Link>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isActive
                  ? "bg-white text-emerald-900"
                  : "text-emerald-50 hover:bg-emerald-800"
              }`
            }
          >
            Alla länder
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
