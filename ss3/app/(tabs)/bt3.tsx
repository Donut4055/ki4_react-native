import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type PostProps = {
  userName?: string;
  userAvatar?: string;
  postImage?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  description?: string;
};

const SocialPost = ({
  userName = 'John Doe',
  userAvatar = 'https://randomuser.me/api/portraits/men/1.jpg',
  postImage = 'https://picsum.photos/500/500',
  likes = 0,
  comments = 0,
  shares = 0,
  description = 'This is a beautiful day to share this amazing moment with all of you! 🌞'
}: PostProps) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [currentLikes, setCurrentLikes] = React.useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: userAvatar }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.content}>
        <Image 
          source={{ uri: postImage }} 
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Ionicons 
            name={isLiked ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isLiked ? '#ff3040' : '#000'}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={{ flex: 1 }} />
        
        <TouchableOpacity>
          <MaterialCommunityIcons name="bookmark-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.likes}>{currentLikes} likes</Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          <Text style={styles.userName}>{userName} </Text>
          {description}
        </Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.comments}>View all {comments} comments</Text>
      </TouchableOpacity>
      
      <Text style={styles.timeAgo}>2 HOURS AGO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
  },
  descriptionContainer: {
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 18,
  },
  comments: {
    color: '#666',
    marginBottom: 4,
    fontSize: 14,
  },
  timeAgo: {
    color: '#999',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export default function SocialMediaPostScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <SocialPost 
        userName="Travel Lover"
        userAvatar="https://randomuser.me/api/portraits/women/44.jpg"
        postImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        likes={1243}
        comments={89}
        shares={24}
        description="Enjoying the beautiful sunset at the beach! 🌅 #vacation #beach #sunset"
      />
      
      <SocialPost 
        userName="Foodie Adventures"
        userAvatar="https://randomuser.me/api/portraits/men/32.jpg"
        postImage="https://images.unsplash.com/photo-1504674900247-0877039348bf"
        likes={892}
        comments={45}
        shares={12}
        description="Delicious homemade pasta for dinner tonight! 🍝 #foodie #homecooking #pasta"
      />
    </ScrollView>
  );
}
