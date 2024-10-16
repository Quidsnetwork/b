import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './../styles/styles';  // Import the global styles

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Simple email validation check for @ symbol
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://quidsnetwork.com:80/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userId', data.userId);
        setUsername(data.username);
        Alert.alert('Signup Successful', `Welcome, ${data.username}!`);
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabHome' }],
        });
      } else {
        Alert.alert('Signup failed', data.error || 'Error during signup');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'An error occurred during signup. Please try again.');
    }
  };

  return (
    <View style={globalStyles.loginContainer}>
      <Text style={globalStyles.commonTitle}>Create Account</Text>
      <TextInput 
        placeholder="Email" 
        style={globalStyles.loginInput} 
        value={email}
        onChangeText={setEmail} 
      />
      <TextInput 
        placeholder="Password" 
        style={globalStyles.loginInput} 
        secureTextEntry 
        value={password}
        onChangeText={setPassword} 
      />
      <TouchableOpacity style={globalStyles.loginButton} onPress={handleSignup}>
        <Text style={globalStyles.commonButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {username ? (
        <View style={globalStyles.usernameContainer}>
          <Text style={globalStyles.usernameText}>Your Username: {username}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default SignupScreen;
