import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TelaInicial from "./pages/TelaInicial";
import Certificados from "./pages/Certificados";
import Eventos from "./pages/Eventos";
import Participantes from "./pages/Participantes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-6 bg-[#F5F5F5] min-h-screen">
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/certificados" element={<Certificados />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/participantes" element={<Participantes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;