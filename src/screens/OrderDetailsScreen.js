import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';

export default function OrderDetailsScreen({ route }) {
  const { personalization, pickupTime, items } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Order Details</Text>

      <Text style={styles.label}>Personalization:</Text>
      <Text style={styles.value}>{personalization || 'None'}</Text>

      <Text style={styles.label}>Pickup Time:</Text>
      <Text style={styles.value}>{pickupTime || 'Not set'}</Text>

      <Text style={styles.label}>Items:</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    marginVertical: 10,
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
