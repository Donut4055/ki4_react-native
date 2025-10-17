import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { ThemedText } from '../themed-text';

type ButtonVariant = 'default' | 'outline' | 'text';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  style,
  disabled = false,
  loading = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return styles.outline;
      case 'text':
        return styles.text;
      default:
        return styles.default;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      case 'text':
        return styles.textStyle;
      default:
        return styles.defaultText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'default' ? '#fff' : '#007AFF'} 
        />
      ) : (
        <ThemedText style={getTextStyle()}>
          {children}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  default: {
    backgroundColor: '#007AFF',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    backgroundColor: 'transparent',
    padding: 0,
    minWidth: 'auto',
  },
  disabled: {
    opacity: 0.5,
  },
  defaultText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textStyle: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
