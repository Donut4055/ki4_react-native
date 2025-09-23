import React from 'react';
import { Pressable, StyleSheet, ViewStyle, PressableProps, TextStyle, StyleProp } from 'react-native';
import { ThemedText } from '@/components/themed-text';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'disabled';

type CustomButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  style,
  textStyle,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}) => {
  // Determine button styles based on variant
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? '#4a90e2' : '#2196F3',
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? '#e0e0e0' : '#f5f5f5',
          borderWidth: 1,
          borderColor: disabled ? '#bdbdbd' : '#e0e0e0',
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: disabled ? '#e57373' : '#f44336',
        };
      case 'disabled':
      default:
        return {
          ...baseStyle,
          backgroundColor: '#e0e0e0',
        };
    }
  };

  // Determine text color based on variant
  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
        return '#ffffff';
      case 'secondary':
        return disabled ? '#9e9e9e' : '#333333';
      case 'danger':
        return '#ffffff';
      case 'disabled':
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getButtonStyles(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
      disabled={disabled || variant === 'disabled'}
      {...rest}
    >
      {leftIcon && <>{leftIcon} </>}
      <ThemedText 
        style={[
          styles.text, 
          { color: getTextColor() },
          textStyle
        ]}
      >
        {title}
      </ThemedText>
      {rightIcon && <> {rightIcon}</>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
