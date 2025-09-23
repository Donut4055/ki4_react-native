import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Pressable, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  Keyboard,
  Text
} from 'react-native';
import { ThemedText } from '@/components/themed-text';

// Sample chat messages
type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Chào bạn! Bạn khỏe không?',
    sender: 'other',
    time: '09:30',
  },
  {
    id: 2,
    text: 'Mình khỏe, cảm ơn bạn! Còn bạn thì sao?',
    sender: 'me',
    time: '09:31',
  },
  {
    id: 3,
    text: 'Mình cũng khỏe. Bạn có kế hoạch gì cho cuối tuần này không?',
    sender: 'other',
    time: '09:32',
  },
  {
    id: 4,
    text: 'Mình định đi xem phim. Bạn có muốn đi cùng không?',
    sender: 'me',
    time: '09:33',
  },
];

export default function Bt7Screen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
      scrollToBottom();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // Simulate received message
  const simulateReply = () => {
    if (newMessage.trim() === '') return;
    
    setTimeout(() => {
      const replies = [
        'Mình hiểu rồi!',
        'Thật thú vị!',
        'Bạn nói đúng đấy!',
        'Mình sẽ suy nghĩ về điều đó.',
        'Cảm ơn bạn đã chia sẻ!',
      ];
      
      const reply: Message = {
        id: messages.length + 2,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleSend = () => {
    sendMessage();
    simulateReply();
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Trò chuyện</ThemedText>
        </View>

        {/* Messages List */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollToBottom()}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageBubble,
                message.sender === 'me' ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <View 
                style={[
                  styles.messageContent,
                  message.sender === 'me' ? styles.myMessageContent : styles.otherMessageContent,
                ]}
              >
                <ThemedText style={styles.messageText}>
                  {message.text}
                </ThemedText>
                <Text style={styles.timeText}>
                  {formatTime(message.time)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Message Input */}
        <View style={[styles.inputContainer, keyboardStatus && styles.inputContainerKeyboardOpen]}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <Pressable 
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <ThemedText style={styles.sendButtonText}>Gửi</ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingBottom: 80, // Add padding to avoid input field covering messages
  },
  messageBubble: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageContent: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myMessageContent: {
    backgroundColor: '#dcf8c6',
    borderTopRightRadius: 4,
  },
  otherMessageContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  inputContainerKeyboardOpen: {
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#25D366',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
