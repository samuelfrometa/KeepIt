import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ListTickets from "./pages/ListTickets";
import AddTicket from "./pages/AddTicket";
import UpdateTicket from "./pages/UpdateTicket";
import DeleteTicket from "./pages/DeleteTicket";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Listar tickets</Link></li>
          <li><Link to="/add">Añadir ticket</Link></li>
          <li><Link to="/update">Actualizar ticket</Link></li>
          <li><Link to="/delete">Eliminar ticket</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ListTickets />} />
        <Route path="/add" element={<AddTicket />} />
        <Route path="/update/:id" element={<UpdateTicket />} />
        <Route path="/delete/:id" element={<DeleteTicket />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
