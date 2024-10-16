import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // Icon for send button
import { globalStyles } from './../styles/styles'; // Import global styles
import moment from 'moment'; // Use moment.js for time formatting

const MessagesScreen = () => {
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null); // Reference to the FlatList

  // Fetch userId from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert('Error', 'No user ID found, please log in again');
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
        Alert.alert('Error', 'Failed to retrieve user ID');
      }
    };
    fetchUserId();
  }, []);

  // Polling: Fetch messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await fetch('https://quidsnetwork.com:80/messages');
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
        scrollToBottom(); // Scroll to bottom whenever new messages are fetched
      } else {
        Alert.alert('Error', data.error || 'Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!message || !userId) {
      Alert.alert('Error', 'Messages required');
      return;
    }

    try {
      const response = await fetch('https://quidsnetwork.com:80/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('');
        fetchMessages();
      } else {
        Alert.alert('Error', data.error || 'Failed to store message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'An error occurred while sending the message');
    }
  };

  // Scroll to the bottom of the FlatList
  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  const renderItem = ({ item, index }) => {
    const isUserMessage = item.userId == userId;
  
    const formattedTime = moment(item.timestamp).format('hh:mm A'); // Time format for each message
    const formattedDate = moment(item.timestamp).format('MMMM Do, YYYY'); // Date format for dividers
  
    // Get the previous message (if exists)
    const prevMessage = index > 0 ? messages[index - 1] : null;
  
    // Show date divider only if it's the first message of the day or a new day starts
    const showDateDivider = !prevMessage || !moment(item.timestamp).isSame(prevMessage?.timestamp, 'day');
  
    return (
      <>
        {/* Render the date divider at the start of messages for a new day */}
        {showDateDivider && (
          <View style={globalStyles.dateDivider}>
            <Text style={globalStyles.dateDividerText}>{formattedDate}</Text>
          </View>
        )}
  
        {/* Render the message bubble */}
        <View style={isUserMessage ? globalStyles.myMessageContainer : globalStyles.otherMessageContainer}>
          <View style={isUserMessage ? globalStyles.myMessageBubble : globalStyles.otherMessageBubble}>
            {/* Display username at the top */}
            <Text style={globalStyles.messageUserId}>
              {isUserMessage ? 'You' : item.username}
            </Text>
            {/* Display the message */}
            <Text style={globalStyles.messageText}>{item.message}</Text>
            {/* Display the time at the bottom */}
            <Text style={globalStyles.messageTimestamp}>{formattedTime}</Text>
          </View>
        </View>
      </>
    );
  };
  
  return (
    <ImageBackground
      source={require('./../assets/b.webp')} // Your background image path
      style={globalStyles.messagecontainer} // Style to cover the entire screen
    >
      <FlatList
        ref={flatListRef} // Reference to the FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={globalStyles.messageList}
        onContentSizeChange={scrollToBottom} // Scroll to bottom when content changes
        initialNumToRender={10}  // Number of messages to initially render
        maxToRenderPerBatch={20} // Max number of items rendered per scroll batch
        removeClippedSubviews={false}  // Prevents cutting off messages in certain scenarios
      />

      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={globalStyles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MessagesScreen;
