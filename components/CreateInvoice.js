import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';

export default function CreateInvoice({ products, customers }) {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock product price list
  const productPrices = {
    'Product A': 50,
    'Product B': 30,
    'Product C': 100,
  };

  // Update subtotal and total when values change
  useEffect(() => {
    const calculatedSubtotal = quantity * unitPrice;
    const taxAmount = calculatedSubtotal * (tax / 100);
    const discountAmount = calculatedSubtotal * (discount / 100);

    setSubtotal(calculatedSubtotal);
    setTotal(calculatedSubtotal + taxAmount - discountAmount);
  }, [quantity, unitPrice, tax, discount]);

  const handleProductChange = (itemValue) => {
    setSelectedProduct(itemValue);
    setUnitPrice(productPrices[itemValue] || 0);
  };

  const generatePDF = async () => {
    setIsLoading(true);

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h3, p { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; }
          </style>
        </head>
        <body>
          <header style="border-bottom: 1px solid #ddd; margin-bottom: 20px;">
            <h1>Invoice</h1>
            <p>Date: ${date || 'Not Specified'}</p>
          </header>

          <section>
            <h3>Customer: ${selectedCustomer || 'Not Selected'}</h3>
          </section>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${selectedProduct || 'Not Selected'}</td>
                <td>${quantity}</td>
                <td>$${unitPrice.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <section>
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (${tax}%): $${(subtotal * tax / 100).toFixed(2)}</p>
            <p>Discount (${discount}%): -$${(subtotal * discount / 100).toFixed(2)}</p>
            <h3>Total: $${total.toFixed(2)}</h3>
          </section>

          <section style="margin-top: 20px;">
            <p><strong>Payment Terms:</strong> ${paymentTerms || 'Not Specified'}</p>
            <p><strong>Notes:</strong> ${notes || 'None'}</p>
          </section>
        </body>
      </html>
    `;

    await Print.printAsync({ html: htmlContent });
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Invoice</Text>

        <Text>Select Customer</Text>
        <Picker
          selectedValue={selectedCustomer}
          onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
          style={styles.input}
        >
          {customers.map((customer, index) => (
            <Picker.Item key={index} label={customer} value={customer} />
          ))}
        </Picker>

        <Text>Select Product</Text>
        <Picker
          selectedValue={selectedProduct}
          onValueChange={handleProductChange}
          style={styles.input}
        >
          {products.map((product, index) => (
            <Picker.Item key={index} label={product} value={product} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setQuantity(parseInt(text) || 1)}
        />

        <TextInput
          style={styles.input}
          placeholder="Unit Price"
          value={unitPrice.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setUnitPrice(parseFloat(text) || 0)}
        />

        <TextInput
          style={styles.input}
          placeholder="Tax (%)"
          value={tax.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setTax(parseFloat(text) || 0)}
        />

        <TextInput
          style={styles.input}
          placeholder="Discount (%)"
          value={discount.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setDiscount(parseFloat(text) || 0)}
        />

        <Text style={styles.label}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.label}>Total: ${total.toFixed(2)}</Text>

        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Payment Terms (e.g., Net 30)"
          value={paymentTerms}
          onChangeText={setPaymentTerms}
        />

        <TextInput
          style={styles.input}
          placeholder="Additional Notes"
          value={notes}
          onChangeText={setNotes}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Generate PDF" onPress={generatePDF} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 20,
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
