import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashScreenComponent from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import AddProduct from './components/AddProduct';
import AddCustomer from './components/AddCustomer';
import CreateInvoice from './components/CreateInvoice';

const Stack = createStackNavigator();

export default function App() {
  const [products, setProducts] = useState([]); // Products state
  const [customers, setCustomers] = useState([]); // Customers state

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS, // Smooth transition animations
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Products">
          {(props) => (
            <AddProduct {...props} products={products} setProducts={setProducts} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Customers">
          {(props) => (
            <AddCustomer {...props} customers={customers} setCustomers={setCustomers} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Invoices">
          {(props) => (
            <CreateInvoice {...props} products={products} customers={customers} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
