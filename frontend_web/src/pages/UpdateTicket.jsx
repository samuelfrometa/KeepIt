import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function UpdateTicket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then(res => {
        const t = res.data;
        setTicket({
          ...t,
          amount: t.amount.toString(),
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await api.put(`/tickets/${id}`, {
        ...ticket,
        id: Number(id),
        amount: Number(ticket.amount)
      });

      alert("Ticket actualizado");
    } catch (err) {
      console.error(err);
    }
  };

  if (!ticket) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={ticket.name} onChange={handleChange} required />
      <input name="category" value={ticket.category} onChange={handleChange} required />
      <input name="image" value={ticket.image || ""} onChange={handleChange} />
      <input name="amount" type="number" step="0.01" value={ticket.amount} onChange={handleChange} required />

      <label>Fecha de compra</label>
      <input type="date" name="date_purchase" value={ticket.date_purchase} onChange={handleChange} required />

      <label>Inicio garantía</label>
      <input type="date" name="warranty_start" value={ticket.warranty_start} onChange={handleChange} required />

      <label>Fin garantía</label>
      <input type="date" name="warranty_end" value={ticket.warranty_end} onChange={handleChange} required />

      <button type="submit">Actualizar</button>
    </form>
  );
}

export default UpdateTicket;
