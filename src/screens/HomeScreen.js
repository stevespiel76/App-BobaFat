import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [personalization, setPersonalization] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [quantities, setQuantities] = useState({});

  const drinks = [
    { id: "1", name: "Iced Mocha Latte", price: 5.5 },
    { id: "2", name: "Matcha Green Tea", price: 4.75 },
    { id: "3", name: "White Jasmin Tea", price: 4.25 },
    { id: "4", name: "Black and Blueberry Tea", price: 4.5 },
    { id: "5", name: "Thai Sunrise Tea", price: 5.0 },
    { id: "6", name: "Peachy Lychee Bellini", price: 5.25 },
  ];

  const foods = [
    { id: "7", name: "Sausage, Egg and Cheese Muffin", price: 6.5 },
    { id: "8", name: "Ham, Egg and Cheese Croissant", price: 6.75 },
    { id: "9", name: "Bacon, Egg and Cheese Biscuit", price: 7.0 },
    { id: "10", name: "Blueberry Cheese Blintz", price: 5.25 },
    { id: "11", name: "Lingonberry Butter Crepe", price: 5.75 },
    { id: "12", name: "Raspberry Creme Pancakes", price: 6.0 },
  ];

  const imageUrl = "https://thumbs.dreamstime.com/b/sketch-coffee-cup-icon-27750957.jpg";

  const adjustQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + delta, 0),
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityRow}>
        <TouchableOpacity onPress={() => adjustQuantity(item.id, -1)}>
          <Text style={styles.quantityButton}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantities[item.id] || 0}</Text>
        <TouchableOpacity onPress={() => adjustQuantity(item.id, 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

  const handleOrder = () => {
    const order = { personalization, pickupTime, quantities, drinks, foods };
    navigation.navigate("OrderDetails", { order });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.welcomeText}>
        Welcome to the <Text style={styles.bobaFat}>Boba Fat</Text> Tea Company
      </Text>

      <View style={styles.headerRow}>
        <Text style={styles.headerLeft}>Beverages</Text>
        <Text style={styles.headerRight}>~&gt;</Text>
      </View>

      <FlatList
        data={drinks}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />

      <View style={styles.headerRow}>
        <Text style={styles.headerLeft}>Food</Text>
        <Text style={styles.headerRight}>~&gt;</Text>
      </View>

      <FlatList
        data={foods}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />

      <Text style={styles.inputLabel}>Personalization</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter special instructions..."
        value={personalization}
        onChangeText={setPersonalization}
      />

      <Text style={styles.inputLabel}>Pickup Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pickup time (e.g. 10:30 AM)"
        value={pickupTime}
        onChangeText={setPickupTime}
      />

      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginVertical: 10, marginHorizontal: 6 },
  welcomeText: { fontSize: 20, textAlign: "center", color: "black", marginBottom: 10 },
  bobaFat: { color: "#8B4513", fontFamily: "Arial", fontWeight: "bold" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  headerLeft: { fontSize: 18, fontWeight: "bold" },
  headerRight: { fontSize: 18, fontWeight: "bold" },
  flatList: { marginBottom: 10 },
  item: { width: 150, padding: 8, alignItems: "center" },
  image: { width: 100, height: 100, borderRadius: 8 },
  itemName: { marginVertical: 4, textAlign: "center" },
  quantityRow: { flexDirection: "row", alignItems: "center" },
  quantityButton: { fontSize: 22, marginHorizontal: 8 },
  quantity: { fontSize: 18 },
  price: { fontSize: 16, fontWeight: "bold", marginTop: 4 },
  inputLabel: { fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 10 },
  orderButton: { backgroundColor: "#8B4513", padding: 12, borderRadius: 8, marginTop: 10 },
  orderButtonText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold" },
});
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Welcome to the BobaFat Tea Company</Text>
      <Text style={styles.subtitle}>Our Menu</Text>

      {/* Beverages Section */}
      <HeaderRow leftText="Beverages" rightText="~>" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: IMG }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          </View>
        )}
      />

      {/* Food Section */}
      <HeaderRow leftText="Food" rightText="~>" />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.foodCard}>
            <Text style={styles.foodName}>{item.title}</Text>
          </View>
        )}
      />

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Personalization"
        value={personalization}
        onChangeText={setPersonalization}
      />
      <TextInput
        style={styles.input}
        placeholder="Pickup Time"
        value={pickupTime}
        onChangeText={setPickupTime}
      />

      {/* Place Order Button */}
      <View style={styles.buttonContainer}>
        <Button title="Place Order" onPress={placeOrder} />
      </View>
    </SafeAreaView>
  );
}

import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  foodCard: {
    padding: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  foodName: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 8,
    marginVertical: 4,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
