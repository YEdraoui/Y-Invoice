import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerButton from './ShimmerButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ShimmerButton title="Products" onPress={() => navigation.navigate('Products')} />
      <ShimmerButton title="Customers" onPress={() => navigation.navigate('Customers')} />
      <ShimmerButton title="Invoices" onPress={() => navigation.navigate('Invoices')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
});
