import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TelaInicial from "./pages/TelaInicial";
import Certificados from "./pages/Certificados";
import Eventos from "./pages/Eventos";
import Participantes from "./pages/Participantes";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: "24px", backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/certificados" element={<Certificados />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/participantes" element={<Participantes />} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;