import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  axis?: 'horizontal' | 'vertical';
  style?: object;
}

/**
 * Spacer component for adding consistent spacing between elements in React Native
 */
export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  axis = 'vertical',
  style = {},
}) => {
  const sizeValue = {
    xs: 4,  // 4px
    sm: 8,  // 8px
    md: 16, // 16px
    lg: 32, // 32px
    xl: 64, // 64px
  }[size];
  
  const styles = {
    spacer: {
      width: axis === 'horizontal' ? sizeValue : 0,
      height: axis === 'vertical' ? sizeValue : 0,
    },
  };

  return <View style={[styles.spacer, style]} />;
};

export default Spacer;