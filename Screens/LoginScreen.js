import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { globalStyles } from './../styles/styles'; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Add state for refreshing

  // Function to handle login logic
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://quidsnetwork.com:80/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userId', data.userId.toString());
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabHome' }],
        });
      } else {
        Alert.alert('Login failed', data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh function to reset inputs and potentially reload data
  const onRefresh = () => {
    setRefreshing(true);
    setEmail('');
    setPassword('');
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={globalStyles.loginContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={globalStyles.commonTitle}>Login</Text>
      <TextInput 
        placeholder="Email" 
        style={globalStyles.loginInput} 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Password" 
        style={globalStyles.loginInput} 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={globalStyles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={globalStyles.commonButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[globalStyles.loginButton, globalStyles.loginButton]} onPress={() => navigation.navigate('Signup')}>
        <Text style={globalStyles.commonButtonText}>Sign up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;
