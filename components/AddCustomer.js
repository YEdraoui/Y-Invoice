import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddCustomer({ customers, setCustomers }) {
  const [customerName, setCustomerName] = useState('');

  const addCustomer = () => {
    if (customerName) {
      setCustomers([...customers, customerName]);
      setCustomerName('');
      Alert.alert('Success', 'Customer added successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Customers</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />

      <Button title="Add Customer" onPress={addCustomer} />

      <FlatList
        data={customers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.customerText}>{item}</Text>
          </View>
        )}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  customerText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  flatList: {
    marginTop: 20,
  },
});
