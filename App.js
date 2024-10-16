import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator'; 
import EditProfileScreen from './Screens/EditProfileScreen'; // Independent EditProfileScreen
import ChangePasswordScreen from './Screens/ChangePasswordScreen'; // Independent ChangePasswordScreen

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state

  // Check user session on app startup
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Retrieve stored user ID
        if (userId) {
          setUser(userId); // Set user state if user is found
        }
      } catch (error) {
        console.error('Failed to load user session:', error);
      } finally {
        setLoading(false); // Stop loading once session is checked
      }
    };
    checkUserSession();
  }, []);

  // Show a loading spinner while checking the session
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Checking session...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
       
          <>
            <Stack.Screen
              name="TabHome"
              component={BottomTabNavigator} // BottomTabNavigator contains other screens
              options={{ headerShown: false }} // Hide header for bottom tab navigator
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen} // Independent Edit Profile Screen
              options={{ title: 'Edit Profile' }} 
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen} // Independent Change Password Screen
              options={{ title: 'Change Password' }}
            />
         
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: 'Sign Up' }}
            />
          </>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
