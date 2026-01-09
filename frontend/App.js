import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TicketListScreen from "./src/screens/TicketListScreen";
import TicketCreateScreen from "./src/screens/TicketCreateScreen";
import TicketEditScreen from "./src/screens/TicketEditScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tickets" component={TicketListScreen} />
        <Stack.Screen name="Create" component={TicketCreateScreen} options={{ title: "Crear" }} />
        <Stack.Screen name="Edit" component={TicketEditScreen} options={{ title: "Editar" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
