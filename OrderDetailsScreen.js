import React from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet } from "react-native";

export default function OrderDetailsScreen({ route }) {
  const { items, personalization, pickupTime } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Order Details</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>
              {item.title} x {item.quantity}
            </Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text>Personalization: {personalization}</Text>
      <Text>Pickup Time: {pickupTime}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    padding: 10,
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontWeight: "bold",
  },
});
