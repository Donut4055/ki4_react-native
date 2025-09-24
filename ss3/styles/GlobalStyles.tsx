import React, { createContext, useContext, useState, useEffect, JSX } from 'react';
import { StyleSheet, Appearance, Platform } from 'react-native';

type ThemeMode = 'light' | 'dark';

type ThemeColors = {
  // Background colors
  background: string;
  backgroundSecondary: string;
  card: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // UI colors
  primary: string;
  secondary: string;
  border: string;
  notification: string;
  
  // Status colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Other
  placeholder: string;
  disabled: string;
};

type Theme = {
  colors: ThemeColors;
  isDark: boolean;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  card: '#FFFFFF',
  
  // Text colors
  text: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
  
  // UI colors
  primary: '#007AFF',
  secondary: '#5856D6',
  border: '#D1D1D6',
  notification: '#FF3B30',
  
  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',
  
  // Other
  placeholder: '#C7C7CD',
  disabled: '#E5E5EA',
};

const darkColors: ThemeColors = {
  // Background colors
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  card: '#1C1C1E',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#48484A',
  
  // UI colors
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  border: '#38383A',
  notification: '#FF453A',
  
  // Status colors
  success: '#30D158',
  error: '#FF453A',
  warning: '#FF9F0A',
  info: '#64D2FF',
  
  // Other
  placeholder: '#8E8E93',
  disabled: '#2C2C2E',
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }): JSX.Element => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');
  
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });
    
    return () => subscription.remove();
  }, []);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  const theme = {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeToggle must be used within a ThemeProvider');
  }
  return context.toggleTheme;
};

// Export both color schemes for direct access if needed
export const COLORS = {
  light: lightColors,
  dark: darkColors,
};

export const FONT_SIZES = {
  // Text sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  
  // Title sizes
  title1: 34,
  title2: 28,
  title3: 22,
  
  // Button text
  button: 17,
};

export const SPACING = {
  // Base unit (4px)
  base: 4,
  
  // Multipliers of base unit
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  xxl: 40,  // 40px
  
  // Common spacing
  container: 16,  // Standard container padding
  section: 24,    // Space between sections
  element: 12,    // Space between form elements
};

// Common styles that don't depend on theme
export const COMMON_STYLES = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    padding: SPACING.md,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  section: {
    marginBottom: SPACING.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    ...Platform.select({
      ios: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        backgroundColor: '#FFFFFF',
        elevation: 2,
        borderRadius: 4,
        marginBottom: SPACING.sm,
      },
    }),
  },
  settingText: {
    fontSize: FONT_SIZES.md,
  },
});

// Create styles that depend on theme
export const createStyles = (theme: Theme) => {
  const { colors } = theme;
  
  return StyleSheet.create({
    container: {
      ...COMMON_STYLES.container,
      backgroundColor: colors.background,
    },
    card: {
      ...COMMON_STYLES.card,
      backgroundColor: colors.card,
    },
    text: {
      color: colors.text,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: SPACING.sm,
      marginBottom: SPACING.md,
      fontSize: FONT_SIZES.md,
      color: colors.text,
      backgroundColor: colors.background,
    },
    label: {
      fontSize: FONT_SIZES.sm,
      color: colors.textSecondary,
      marginBottom: SPACING.xs,
    },
    button: {
      backgroundColor: colors.primary,
      padding: SPACING.sm,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SPACING.md,
    },
    buttonText: {
      color: colors.text,
      fontSize: FONT_SIZES.button,
      fontWeight: '600',
    },
    errorText: {
      color: colors.error,
      fontSize: FONT_SIZES.sm,
      marginTop: -SPACING.sm,
      marginBottom: SPACING.sm,
    },
    settingRow: {
      ...COMMON_STYLES.settingRow,
      backgroundColor: colors.card,
    },
    settingText: {
      ...COMMON_STYLES.settingText,
      color: colors.text,
    },
    sectionHeader: {
      padding: SPACING.md,
      paddingBottom: SPACING.sm,
    },
    sectionHeaderText: {
      fontSize: FONT_SIZES.sm,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });
};
