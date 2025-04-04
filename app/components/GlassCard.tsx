
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type GlassCardProps = {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children = 'YOUR\nCONTENT\nHERE',
  width = 190,
  height = 254,
  borderRadius = 30,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.cardContainer, { width, height, borderRadius }, style]}>
      <View style={[styles.cardInner, { borderRadius: borderRadius - 5 }]}>
        {typeof children === 'string' ? (
          <Text style={[styles.text, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.25)', // glass background
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    color: '#c7c4c4',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});