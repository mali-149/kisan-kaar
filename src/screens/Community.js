import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const Community = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'User ID is missing');
      console.log("Received userId:", userId);
      return;
    }

    const messagesRef = firestore().collection('Messages').doc(userId).collection('Chats');
    const unsubscribe = messagesRef.orderBy('createdAt', 'desc').onSnapshot(
      querySnapshot => {
        const allMessages = querySnapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setMessages(allMessages);
      },
      error => {
        console.error("Failed to subscribe to messages:", error);
        Alert.alert('Error', 'Failed to load messages');
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const handleSend = () => {
    if (newMessage.trim().length === 0) return;

    const messagesRef = firestore().collection('Messages').doc(userId).collection('Chats');
    messagesRef.add({
      text: newMessage,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      setNewMessage('');
    })
    .catch(error => {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.text}</Text>
        )}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here..."
          placeholderTextColor={'#1DB954'}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  message: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: '#1DB954',
    marginVertical: 2,
    alignSelf: 'flex-end', 
    borderRadius: 10, 
    color:'#FFFFFF'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderRadius: 30,
    color:'#1DB954'
  },
  sendButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default Community;
