import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { globalStyles } from './../styles/styles';  // Import the global styles

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [refreshing, setRefreshing] = useState(false);  // State for refreshing

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  // Handle the refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData(); // Reload user data when refresh is triggered
    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      setUserId(null);
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Failed to logout:', error);
      Alert.alert('Error', 'An error occurred while logging out.');
    }
  };

  return (
    <ScrollView 
      style={globalStyles.settingsContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={globalStyles.commonTitle}>Tools</Text>

      {userId ? (
        <>
          {/* Profile Section */}
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="account-circle" size={35} color="#34B7F1" />
              <Text style={globalStyles.settingsText}>Edit Profile</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          {/* Verification Plan Section */}
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('VerificationPlan')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="shield-check" size={35} color="#FF9800" />
              <Text style={globalStyles.settingsText}>Verified Badge</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          {/* Friends List Section 
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('FriendsList')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="account-multiple" size={35} color="#4CAF50" />
              <Text style={globalStyles.settingsText}>Friends List</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

         
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('StarredMessages')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="star" size={35} color="#FFD700" />
              <Text style={globalStyles.settingsText}>Starred Messages</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          

          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('SecuritySettings')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialIcons name="security" size={35} color="#FF5722" />
              <Text style={globalStyles.settingsText}>Security</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

  
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('PrivacySettings')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="lock" size={35} color="#9C27B0" />
              <Text style={globalStyles.settingsText}>Privacy</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>  

          */}

          {/* Notifications Section */}
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('NotificationSettings')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="bell" size={35} color="#FF9800" />
              <Text style={globalStyles.settingsText}>Notifications</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          {/* Invite Friends Section
          <TouchableOpacity
            style={globalStyles.settingsItem}
            onPress={() => navigation.navigate('InviteFriends')}
          >
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="link" size={35} color="#00BCD4" />
              <Text style={globalStyles.settingsText}>Invite Friends</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity> */}

          {/* Logout Button */}
          <TouchableOpacity style={globalStyles.settingsItem} onPress={handleLogout}>
            <View style={globalStyles.iconLabelContainer}>
              <MaterialCommunityIcons name="logout" size={35} color="#F44336" />
              <Text style={globalStyles.settingsText}>Logout</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          <View style={globalStyles.bottomSpace} />
        </>
      ) : (
        <>
          <Text style={globalStyles.noticeText}>Please log in to access your account settings.</Text>
          <TouchableOpacity
            style={globalStyles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={globalStyles.commonButtonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default SettingsScreen;
