import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type LikeButtonProps = {
  style?: StyleProp<ViewStyle>;
};

export const LikeButton: React.FC<LikeButtonProps> = ({ style }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handlePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isLiked ? styles.likedButton : styles.unlikedButton,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isLiked && styles.likedText]}>
        {isLiked ? 'Đã thích' : 'Thích'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  unlikedButton: {
    backgroundColor: '#f0f0f0',
  },
  likedButton: {
    backgroundColor: '#1877f2',
    borderColor: '#1877f2',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  likedText: {
    color: 'white',
  },
});
