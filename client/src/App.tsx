import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="flex flex-1">
        <aside className="w-15 bg-[#0e0e0f] text-white">
          <Sidebar />
        </aside>

        <main className="flex-1 bg-[#000000]">
          <Outlet />
        </main>
      </div>

      <footer className="bg-[#242526] text-white p-4">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
