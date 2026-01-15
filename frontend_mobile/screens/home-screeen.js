import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const API_URL = "http://192.168.1.14:8000/tickets";

export default function Home({ navigation }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(console.error);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable 
          style={styles.user} 
          onPress={() => navigation.navigate("Profile")}>
          <View style={styles.avatar} />
          <View style={styles.user_name} />
        </Pressable>
      </View>
      <View style={styles.summary} >

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header : {
    height: 50,
    width: 200,
    marginLeft: 15,
    backgroundColor: "#E62F20",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar : {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#E620DA',
  },
  user_name : {
    height: 50,
    width: 140,
    marginLeft: 10,
    backgroundColor: '#51E622'
  },
  safe : {
    flex : 1,
  },
  summary : {
    height: 200,
    width: 350,
    marginLeft: 25,
    borderRadius: 30,
    backgroundColor: "#B6CDE6"
  }
});
