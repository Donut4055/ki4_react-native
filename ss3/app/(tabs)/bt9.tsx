import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  useWindowDimensions,
  Platform,
  ImageErrorEventData,
  NativeSyntheticEvent
} from 'react-native';
import { FONT_SIZES, SPACING, useTheme } from '../../styles/GlobalStyles';

interface Author {
  name: string;
  avatar: string;
}

interface ArticleType {
  title: string;
  coverImage: string;
  author: Author;
  date: string;
  content: string;
}

// Fallback image for when loading fails
const FALLBACK_IMAGE = 'https://via.placeholder.com/1200x600/cccccc/999999?text=No+Image';
const FALLBACK_AVATAR = 'https://via.placeholder.com/100/cccccc/999999?text=U';

const ArticleScreen: React.FC = () => {
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  
  // Handle image loading errors
  const handleImageError = (setImageUrl: React.Dispatch<React.SetStateAction<string>>) => 
    (error: NativeSyntheticEvent<ImageErrorEventData>) => {
      setImageUrl(FALLBACK_IMAGE);
    };
    
  const handleAvatarError = (setAvatarUrl: React.Dispatch<React.SetStateAction<string>>) => 
    (error: NativeSyntheticEvent<ImageErrorEventData>) => {
      setAvatarUrl(FALLBACK_AVATAR);
    };

  const article: ArticleType = {
    title: 'Công nghệ AI đang thay đổi cách chúng ta làm việc như thế nào?',
    coverImage: 'https://picsum.photos/1200/600?random=1',
    author: {
      name: 'Nguyễn Văn A',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    date: '24 tháng 9, 2025',
    content: `Trong thời đại công nghệ 4.0, trí tuệ nhân tạo (AI) đang trở thành một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta. Từ những trợ lý ảo thông minh cho đến các hệ thống tự động hóa phức tạp, AI đang dần thay đổi cách chúng ta làm việc và tương tác với thế giới xung quanh.

Một trong những lĩnh vực chịu ảnh hưởng mạnh mẽ nhất từ AI chính là thị trường lao động. Nhiều công việc truyền thống đang dần được tự động hóa, trong khi những công việc mới yêu cầu kỹ năng về AI và phân tích dữ liệu ngày càng trở nên phổ biến.

Tuy nhiên, sự phát triển của AI cũng đặt ra nhiều thách thức về đạo đức và quyền riêng tư. Làm thế nào để cân bằng giữa lợi ích và rủi ro của AI là câu hỏi lớn đang được đặt ra cho toàn xã hội.`
  };

  const [coverImage, setCoverImage] = React.useState(article.coverImage);
  const [authorAvatar, setAuthorAvatar] = React.useState(article.author.avatar);
  
  const titleFontSize = Math.max(24, Math.min(32, windowWidth * 0.06));
  const contentFontSize = Math.max(14, Math.min(18, windowWidth * 0.04));
  const authorFontSize = Math.max(12, Math.min(14, windowWidth * 0.035));
  const dateFontSize = Math.max(10, Math.min(12, windowWidth * 0.03));

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentInsetAdjustmentBehavior="automatic"
      accessibilityLabel="Bài viết"
      accessibilityRole="none"
    >
      <Image 
        source={{ uri: coverImage }} 
        style={[styles.coverImage, { width: windowWidth, height: windowWidth * 0.6 }]} 
        resizeMode="cover"
        onError={handleImageError(setCoverImage)}
        accessibilityLabel="Ảnh bìa bài viết"
        accessibilityRole="image"
      />
      
      <View style={[styles.contentContainer, { padding: SPACING.lg }]}>
        <Text 
          style={[styles.title, { 
            fontSize: titleFontSize, 
            color: theme.colors.text,
            lineHeight: titleFontSize * 1.3,
            marginBottom: SPACING.lg
          }]}
          accessibilityRole="header"
          accessibilityLabel={`Tiêu đề: ${article.title}`}
        >
          {article.title}
        </Text>
        
        <View style={styles.authorContainer}>
          <Image 
            source={{ uri: authorAvatar }} 
            style={[styles.avatar, { marginRight: SPACING.md }]} 
            onError={handleAvatarError(setAuthorAvatar)}
            accessibilityLabel={`Ảnh đại diện của ${article.author.name}`}
            accessibilityRole="image"
          />
          <View style={styles.authorInfo}>
            <Text 
              style={[styles.authorName, { 
                fontSize: authorFontSize, 
                color: theme.colors.text,
                marginBottom: 2
              }]}
              accessibilityRole="text"
            >
              {article.author.name}
            </Text>
            <Text 
              style={[styles.date, { 
                fontSize: dateFontSize, 
                color: theme.colors.textSecondary 
              }]}
              accessibilityRole="text"
            >
              {article.date}
            </Text>
          </View>
        </View>
        
        <Text 
          style={[styles.content, { 
            fontSize: contentFontSize, 
            lineHeight: contentFontSize * 1.6,
            color: theme.colors.text,
            textAlign: 'justify'
          }]}
          accessibilityRole="text"
        >
          {article.content}
        </Text>
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    aspectRatio: 16/9,
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.lg,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: 'bold',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: '600',
  },
  date: {
    opacity: 0.8,
  },
  content: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'sans-serif',
  },
});

export default ArticleScreen;
