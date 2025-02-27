import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";
import Logo from "./components/sidebar/Logo";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="flex flex-1">
        <Logo />
        <aside className="w-10 bg-[#0e0e0f] text-white ">
          <Sidebar />
        </aside>

        <main className="flex-1 bg-[#000000]">
          <Outlet />
        </main>
      </div>

      <footer className="bg-[#0e0e0f] text-white">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
