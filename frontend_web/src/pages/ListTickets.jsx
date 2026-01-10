import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function ListTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get("/tickets/")
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de tickets</h2>

      {tickets.length === 0 ? (
        <p>No hay tickets</p>
      ) : (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              #{ticket.id} - {ticket.title}
              {" "}
              <Link to={`/update/${ticket.id}`}>Editar</Link>
              {" | "}
              <Link to={`/delete/${ticket.id}`}>Eliminar</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListTickets;
