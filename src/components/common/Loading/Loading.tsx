import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants';

type AppLoadingProps = {
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Loading: React.FC<AppLoadingProps> = ({
  size = 'large',
  color = Colors.success,
  style,
}) => {
  return (
    <View style={[s.loading, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Loading };
