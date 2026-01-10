import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function DeleteTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await api.delete(`/tickets/${id}`);
    alert("Ticket eliminado");
    navigate("/");
  };

  return <button onClick={handleDelete}>Eliminar ticket {id}</button>;
}

export default DeleteTicket;
