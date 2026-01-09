import { View, Text } from "react-native";
import TicketForm from "../templates/TicketForm";
import { TicketsAPI } from "../core/api";

export default function TicketCreateScreen({ navigation }) {
  const onSubmit = async (ticket) => {
    await TicketsAPI.create(ticket);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          padding: 16,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Crear ticket
      </Text>

      <TicketForm submitLabel="Crear" onSubmit={onSubmit} />
    </View>
  );
}
