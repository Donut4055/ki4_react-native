import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';

type HeaderProps = {
  title: string;
  headerStyle?: object;
  headerTitleStyle?: object;
};

const Header: React.FC<HeaderProps> = ({ 
  title, 
  headerStyle, 
  headerTitleStyle 
}) => {
  return (
    <SafeAreaView style={[styles.headerContainer, headerStyle]}>
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} 
        backgroundColor={Platform.OS === 'ios' ? '#fff' : '#2196F3'}
      />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, headerTitleStyle]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#A7A7AA',
      },
      android: {
        backgroundColor: '#2196F3', // Material Blue 500
        elevation: 4,
      },
    }),
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 16,
  },
  headerTitle: {
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
      },
      android: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
      },
    }),
  },
});

export default Header;
