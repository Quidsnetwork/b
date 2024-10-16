import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, ActivityIndicator, Image, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { globalStyles } from './../styles/styles'; // Import global styles

const ProfileScreen = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const [imageLoading, setImageLoading] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChapterContent, setSelectedChapterContent] = useState('');
  const [selectedChapterTitle, setSelectedChapterTitle] = useState('');
  const [selectedChapterImage, setSelectedChapterImage] = useState('');

  // Fetch chapters from the database
  const fetchChapters = async () => {
    try {
      const response = await fetch('https://quidsnetwork.com:80/chapters');
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load chapters');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing after data is fetched
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchChapters(); // Re-fetch chapters on refresh
  };

  // Function to handle chapter click and fetch chapter content
  const handleChapterClick = async (chapter) => {
    try {
      setLoading(true);
      const response = await fetch(`https://quidsnetwork.com:80/chapters/${chapter.id}`);
      const data = await response.json();

      setSelectedChapterContent(data.content);
      setSelectedChapterTitle(chapter.title);
      setSelectedChapterImage(data.image_path);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to load chapter content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={globalStyles.loadingText}>Loading chapter...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={globalStyles.commonContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={globalStyles.commonTitle}>My Courses</Text>

      <View style={globalStyles.chaptersContainer}>
        {chapters.map((chapter) => (
          <TouchableOpacity
            key={chapter.id}
            style={globalStyles.chapterCircle}
            onPress={() => handleChapterClick(chapter)}
          >
            <Text style={globalStyles.chapterText}>{chapter.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal to display chapter content */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
              {imageLoading && (
                <ActivityIndicator size="large" color="#25D366" />
              )}
              {selectedChapterImage ? (
                <Image 
                  source={{ uri: selectedChapterImage }} 
                  style={globalStyles.modalImage} 
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                />
              ) : null}

              <Text style={globalStyles.modalTitle}>{selectedChapterTitle}</Text>
              <Text style={globalStyles.modalText}>{selectedChapterContent}</Text>

              <TouchableOpacity
                style={globalStyles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={globalStyles.commonButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
