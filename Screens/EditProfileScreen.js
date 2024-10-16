import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { globalStyles } from './../styles/styles'; // Import global styles

const EditProfileScreen = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  useEffect(() => {
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
    loadUserData();
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveProfile = async (field) => {
    let updateField = field === 'email' ? email : username;

    // Perform validation
    if (field === 'email' && !isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }
    if (field === 'username' && username.length < 5) {
      Alert.alert('Error', 'Username must be at least 5 characters long.');
      return;
    }

    try {
      const response = await fetch(`https://quidsnetwork.com:80/edit/${field}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, [field]: updateField }), // Update only the selected field
      });

      const text = await response.text();
      console.log('Response Text:', text);

      const data = JSON.parse(text);

      if (response.ok) {
        Alert.alert('Success', `${field} updated successfully.`);
      } else {
        Alert.alert('Error', data.error || `Failed to update ${field}.`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      Alert.alert('Error', `An error occurred while updating the ${field}.`);
    }
  };

  return (
    <View style={globalStyles.commonContainer}>
      <Text style={globalStyles.commonTitle}>Edit Profile</Text>

{/* Email Section */}
<TouchableOpacity onPress={() => setShowEmailModal(true)} style={globalStyles.profileActionButton}>
  <View style={globalStyles.profileActionContent}>
    <MaterialIcons name="email" size={24} color="#075E54" style={globalStyles.leftIcon} />
    <Text style={globalStyles.settingsText}>Edit Email</Text>
  </View>
</TouchableOpacity>

{/* Username Section */}
<TouchableOpacity onPress={() => setShowUsernameModal(true)} style={globalStyles.profileActionButton}>
  <View style={globalStyles.profileActionContent}>
    <MaterialIcons name="person" size={24} color="#075E54" style={globalStyles.leftIcon} />
    <Text style={globalStyles.settingsText}>Edit Username</Text>
  </View>
</TouchableOpacity>


      {/* Modal for Email */}
      <Modal
        visible={showEmailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEmailModal(false)}
      >
        <View style={globalStyles.fullscreenModalContainer}>
          <View style={globalStyles.modalContent}>
            <TextInput
              placeholder="Email"
              style={globalStyles.modalInput}
              value={email}
              onChangeText={setEmail}
            />
            <View style={globalStyles.modalActions}>
              <TouchableOpacity onPress={() => setShowEmailModal(false)}>
                <Text style={globalStyles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSaveProfile('email');
                  setShowEmailModal(false);
                }}
              >
                <Text style={globalStyles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Username */}
      <Modal
        visible={showUsernameModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowUsernameModal(false)}
      >
        <View style={globalStyles.fullscreenModalContainer}>
          <View style={globalStyles.modalContent}>
            <TextInput
              placeholder="Username"
              style={globalStyles.modalInput}
              value={username}
              onChangeText={setUsername}
            />
            <View style={globalStyles.modalActions}>
              <TouchableOpacity onPress={() => setShowUsernameModal(false)}>
                <Text style={globalStyles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSaveProfile('username');
                  setShowUsernameModal(false);
                }}
              >
                <Text style={globalStyles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfileScreen;
