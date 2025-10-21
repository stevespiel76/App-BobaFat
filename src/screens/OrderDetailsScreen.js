import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailsScreen({ route }) {
  const { order } = route.params || {};
  const allItems = [...order.drinks, ...order.foods];
  const orderedItems = allItems.filter((item) => order.quantities[item.id] > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Order Details</Text>

      <Text style={styles.label}>Personalization:</Text>
      <Text style={styles.value}>{order.personalization || "None"}</Text>

      <Text style={styles.label}>Pickup Time:</Text>
      <Text style={styles.value}>{order.pickupTime || "Not specified"}</Text>

      <Text style={styles.label}>Items:</Text>
      <FlatList
        data={orderedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name}</Text>
            <Text>Qty: {order.quantities[item.id]}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginVertical: 10, marginHorizontal: 6 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { marginBottom: 8 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
});
    marginHorizontal: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    marginBottom: 8,
    fontSize: 16,
  },
  item: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 6,
  },
  itemName: {
    fontWeight: 'bold',
  },
});
