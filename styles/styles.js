import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Common styles used across multiple screens
  commonContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  commonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    alignSelf: 'center',
  },
  commonButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Profile-specific styles
  chaptersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  chapterCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#38B6FF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  chapterText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    width: '40%',
    backgroundColor: '#27AA6B',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },

  // Settings-specific styles
  settingsContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  settingsItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  settingsText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSpace: {
    height: 100,
  },
  noticeText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },

  loginButton: {
    backgroundColor: '#075E54',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },

  // Login screen-specific styles
  loginContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loginInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#38B6FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: '#27AA6B',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },

  // Messages-specific styles

  messagecontainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    maxWidth: '70%',
    marginBottom: 15, // Add marginBottom here for spacing
  },
  myMessageBubble: {
    padding: 10,
    backgroundColor: '#56b08e',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15, // Add marginBottom here for spacing
 
  },
  otherMessageBubble: {
    padding: 10,
    backgroundColor: '#ECF0F1',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
  },
  messageUserId: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
  },
  sendButton: {
    backgroundColor: '#27AA6B',
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },

  
  dateDivider: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E0E0E0', // Light gray background
    borderRadius: 10,
  },
  dateDividerText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  messageUserId: {
    fontSize: 12, // Smaller font size for the username
    color: '#555', // Gray color
    marginBottom: 5, // Space below the username
  },
  messageTimestamp: {
    fontSize: 10, // Smaller font size for the time
    color: '#999', // Light gray color
    alignSelf: 'flex-end', // Align to the bottom-right
    marginTop: 5, // Space above the time
  },

  // Existing styles
  commonContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  commonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#075E54',
    marginBottom: 20,
    alignSelf: 'center',
  },
  commonButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: '#075E54',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },

  
  profileActionButton: {
    backgroundColor: '#fff', // Match settings section background
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2, // Add subtle shadow effect
  },
  
  profileActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ensure content fills available space
  },
  
  leftIcon: {
    marginRight: 15, // Space between icon and text
  },
  
    


  // Modal styles
  fullscreenModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background overlay
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    color: '#075E54',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



