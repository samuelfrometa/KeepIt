import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import TicketForm from "../templates/TicketForm";
import { TicketsAPI } from "../core/api";

export default function TicketEditScreen({ route, navigation }) {
  const { id } = route.params;
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await TicketsAPI.get(id);
        setTicket(data);
      } catch (e) {
        setError(String(e.message || e));
      }
    })();
  }, [id]);

  const onSubmit = async (updated) => {
    await TicketsAPI.update(id, updated);
    navigation.goBack();
  };

  if (error) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Editar ticket #{id}</Text>
      <TicketForm initialValues={ticket} submitLabel="Guardar" onSubmit={onSubmit} />
    </View>
  );
}
    