import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const beverages = [
  { id: "1", title: "Iced Mocha Latte", desc: "Chilled chocolate espresso", price: 4.99 },
  { id: "2", title: "Matcha Green Tea", desc: "Smooth and earthy", price: 4.49 },
  { id: "3", title: "White Jasmine Tea", desc: "Delicate floral aroma", price: 3.99 },
  { id: "4", title: "Black and Blueberry Tea", desc: "Sweet and tart blend", price: 4.29 },
  { id: "5", title: "Thai Sunrise Tea", desc: "Fruity and refreshing", price: 4.59 },
  { id: "6", title: "Peachy Lychee Bellini", desc: "Juicy peach & lychee", price: 4.79 },
];

const foodItems = [
  { id: "7", title: "Sausage, Egg and Cheese Muffin", desc: "Savory and filling", price: 5.49 },
  { id: "8", title: "Ham, Egg and Cheese Croissant", desc: "Flaky and rich", price: 5.29 },
  { id: "9", title: "Bacon, Egg and Cheese Biscuit", desc: "Classic breakfast combo", price: 5.19 },
  { id: "10", title: "Blueberry Cheese Blintz", desc: "Sweet and creamy", price: 4.99 },
  { id: "11", title: "Lingonberry Butter Crepe", desc: "Tangy and smooth", price: 4.89 },
  { id: "12", title: "Raspberry Creme Pancakes", desc: "Soft and fruity", price: 5.39 },
];

const imageUrl = "https://thumbs.dreamstime.com/b/sketch-coffee-cup-icon-27750957.jpg";

function HeaderRow({ leftText, rightText }) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerLeft}>{leftText}</Text>
      <Text style={styles.headerRight}>{rightText}</Text>
    </View>
  );
}

function ProductItem({ item, quantities, setQuantities }) {
  const quantity = quantities[item.id] || 0;
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => setQuantities({ ...quantities, [item.id]: Math.max(quantity - 1, 0) })}
          style={styles.qtyButton}
        >
          <Text style={styles.qtyButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => setQuantities({ ...quantities, [item.id]: quantity + 1 })}
          style={styles.qtyButton}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [quantities, setQuantities] = useState({});
  const [personalization, setPersonalization] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handlePlaceOrder = () => {
    const order = { quantities, personalization, pickupTime };
    navigation.navigate("OrderDetails", { order });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>
            Welcome to the <Text style={styles.bobaFat}>Boba Fat</Text>{" "}
            <Text style={styles.cursive}>Tea Company</Text>
          </Text>

          <HeaderRow leftText="Beverages" rightText="~>" />
          <FlatList
            data={beverages}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductItem item={item} quantities={quantities} setQuantities={setQuantities} />
            )}
          />

          <HeaderRow leftText="Food" rightText="~>" />
          <FlatList
            data={foodItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductItem item={item} quantities={quantities} setQuantities={setQuantities} />
            )}
          />

          <Text style={styles.inputLabel}>Personalization</Text>
          <TextInput
            style={styles.input}
            placeholder="Add instructions (optional)"
            value={personalization}
            onChangeText={setPersonalization}
          />

          <Text style={styles.inputLabel}>Pickup Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pickup time (e.g., 10:30 AM)"
            value={pickupTime}
            onChangeText={setPickupTime}
          />

          <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
            <Text style={styles.orderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function OrderDetailsScreen({ route, navigation }) {
  const { order } = route.params;

  const allItems = beverages.concat(foodItems);
  const orderedItems = Object.entries(order.quantities)
    .filter(([id, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = allItems.find((x) => x.id === id);
      return { ...product, quantity: qty, total: product.price * qty };
    });

  const totalCost = orderedItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <Text style={styles.orderTitle}>Order Details</Text>
        <Text>Personalization: {order.personalization || "None"}</Text>
        <Text>Pickup Time: {order.pickupTime || "Not specified"}</Text>

        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 16 }}>Items Ordered:</Text>
        {orderedItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.orderItemText}>
              {item.title} × {item.quantity}
            </Text>
            <Text style={styles.orderItemText}>${item.total.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>${totalCost.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.orderButton, { marginTop: 20 }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.orderButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginVertical: 10, marginHorizontal: 6 },
  container: { flex: 1 },
  welcomeText: { fontSize: 22, textAlign: "center", color: "black", fontFamily: "cursive", marginBottom: 10 },
  bobaFat: { color: "#8B4513", fontFamily: "Arial", fontWeight: "bold" },
  cursive: { fontFamily: "cursive" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 8, paddingHorizontal: 4 },
  headerLeft: { fontSize: 18, fontWeight: "bold" },
  headerRight: { fontSize: 18, color: "gray" },
  productCard: { width: 160, backgroundColor: "#fff", borderRadius: 10, padding: 8, marginRight: 10, alignItems: "center", elevation: 2 },
  image: { width: 100, height: 100, resizeMode: "contain", marginBottom: 6 },
  productTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  desc: { fontSize: 12, textAlign: "center", color: "#555", marginBottom: 4 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  qtyButton: { backgroundColor: "#ddd", borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  qtyButtonText: { fontSize: 16, fontWeight: "bold" },
  quantityText: { marginHorizontal: 8, fontSize: 14 },
  price: { fontSize: 14, color: "#444", marginBottom: 4 },
  inputLabel: { fontWeight: "bold", marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 6 },
  orderButton: { backgroundColor: "#8B4513", padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  orderButtonText: { fontWeight: "bold", color: "#fff" },
  orderTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  orderItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 2 },
  orderItemText: { fontSize: 14 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderTopWidth: 1, borderTopColor: "#ccc", paddingTop: 6 },
  totalText: { fontSize: 16, fontWeight: "bold" },
});
