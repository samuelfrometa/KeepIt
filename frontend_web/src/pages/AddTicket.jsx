import { useState } from "react";
import api from "../api";

const initialState = {
  name: "",
  category: "",
  image: "",
  amount: "",
  date_purchase: "",
  warranty_start: "",
  warranty_end: ""
};

function AddTicket() {
  const [ticket, setTicket] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await api.post("/tickets/", {
        id: Date.now(), // id temporal (mejor usar backend)
        ...ticket,
        amount: Number(ticket.amount),
        date_upload: new Date().toISOString().split("T")[0]
      });

      alert("Ticket creado");
      setTicket(initialState);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} required />
      <input name="category" placeholder="Categoría" onChange={handleChange} required />
      <input name="image" placeholder="URL imagen" onChange={handleChange} />
      <input name="amount" type="number" step="0.01" placeholder="Importe" onChange={handleChange} required />

      <label>Fecha de compra</label>
      <input type="date" name="date_purchase" onChange={handleChange} required />

      <label>Inicio garantía</label>
      <input type="date" name="warranty_start" onChange={handleChange} required />

      <label>Fin garantía</label>
      <input type="date" name="warranty_end" onChange={handleChange} required />

      <button type="submit">Crear</button>
    </form>
  );
}

export default AddTicket;
