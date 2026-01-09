import { useCallback, useState } from "react";
import { View, Text, FlatList, Button, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TicketsAPI } from "../core/api";

export default function TicketListScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await TicketsAPI.list();
      setTickets(data || []);
    } catch (e) {
      setError(e.message || "Error cargando tickets");
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const onDelete = async (id) => {
    try {
      await TicketsAPI.remove(id);
      await load();
    } catch (e) {
      setError(e.message || "Error eliminando ticket");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Crear ticket"
        onPress={() => navigation.navigate("Create")}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <FlatList
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 12,
              borderRadius: 10,
              marginVertical: 4,
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Edit", { id: item.id })}
            >
              <Text style={{ fontWeight: "700" }}>{item.name}</Text>
              <Text>{item.category}</Text>
              <Text>{item.amount} €</Text>
            </Pressable>

            <Button
              title="Eliminar"
              onPress={() => onDelete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
