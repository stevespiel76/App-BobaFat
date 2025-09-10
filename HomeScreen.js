import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const products = [
  { id: "1", title: "Iced Mocha Latte", desc: "Chilled espresso & chocolate", price: 4.5 },
  { id: "2", title: "Matcha Green Tea", desc: "Earthy & refreshing", price: 5.0 },
  { id: "3", title: "White Jasmin Tea", desc: "Delicate floral tea", price: 4.0 },
  { id: "4", title: "Black and Blueberry Tea", desc: "Fruity black tea", price: 4.5 },
  { id: "5", title: "Thai Sunrise Tea", desc: "Sweet & spicy blend", price: 5.5 },
  { id: "6", title: "Peachy Lychee Bellini", desc: "Fruity iced blend", price: 6.0 },
];

export default function HomeScreen({ navigation }) {
  const [quantities, setQuantities] = useState({});
  const [personalization, setPersonalization] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const updateQuantity = (id, change) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[id] || 0) + change, 0);
      return { ...prev, [id]: newQty };
    });
  };

  const placeOrder = () => {
    const orderedItems = products
      .filter((p) => quantities[p.id] > 0)
      .map((p) => ({ ...p, quantity: quantities[p.id] }));

    navigation.navigate("OrderDetails", {
      items: orderedItems,
      personalization,
      pickupTime,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://thumbs.dreamstime.com/b/sketch-coffee-cup-icon-27750957.jpg",
        }}
        style={styles.cupImage}
      />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text>{item.desc}</Text>
      <Text>${item.price.toFixed(2)}</Text>
      <View style={styles.qtyRow}>
        <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
        <Text style={styles.qtyText}>{quantities[item.id] || 0}</Text>
        <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Welcome to the BobaFat Tea Company</Text>
      <Text style={styles.subtitle}>Our Menu</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TextInput
        placeholder="Personalization"
        value={personalization}
        onChangeText={setPersonalization}
        style={styles.input}
      />
      <TextInput
        placeholder="Pickup Time"
        value={pickupTime}
        onChangeText={setPickupTime}
        style={styles.input}
      />

      <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    maxHeight: Dimensions.get("window").height * 0.4,
  },
  cupImage: {
    width: 100,
    height: 100,
    marginBottom: 6,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: "teal",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
