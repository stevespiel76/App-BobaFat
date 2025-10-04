import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, Button, StyleSheet } from 'react-native';
import HeaderRow from '../components/HeaderRow';

const IMG = 'https://thumbs.dreamstime.com/b/sketch-coffee-cup-icon-27750957.jpg';

const products = [
  { id: '1', title: 'Iced Mocha Latte', price: '$4.50' },
  { id: '2', title: 'Matcha Green Tea', price: '$4.00' },
  { id: '3', title: 'White Jasmin Tea', price: '$3.75' },
  { id: '4', title: 'Black and Blueberry Tea', price: '$4.25' },
  { id: '5', title: 'Thai Sunrise Tea', price: '$4.50' },
  { id: '6', title: 'Peachy Lychee Bellini', price: '$5.00' },
];

const foods = [
  { id: '1', title: 'Sausage, Egg and Cheese Muffin' },
  { id: '2', title: 'Ham, Egg and Cheese Croissant' },
  { id: '3', title: 'Bacon, Egg and Cheese Biscuit' },
  { id: '4', title: 'Blueberry Cheese Blintz' },
  { id: '5', title: 'Lingonberry Butter Crepe' },
  { id: '6', title: 'Raspberry Creme Pancakes' },
];

export default function HomeScreen({ navigation }) {
  const [personalization, setPersonalization] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const placeOrder = () => {
    navigation.navigate('OrderDetails', {
      personalization,
      pickupTime,
      items: products,
    });
  };

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
