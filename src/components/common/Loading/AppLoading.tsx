import React, { useEffect, useRef} from 'react';
import { 
  ViewProps, StyleProp, 
  ActivityIndicator, StyleSheet, Animated 
} from 'react-native';
import {Colors } from '@/constants';

type AppLoadingProps = {
  style?: StyleProp<ViewProps>;
  size?: "small" | "large";
  color?: string;
};


const AppLoading: React.FC<AppLoadingProps> = ({
  style = {},
  size = "large",
  color = Colors.success,
 
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity])

  return (
    <Animated.View style={[s.loading, style, { opacity }]}>
      <ActivityIndicator size={size} color={color} />
    </Animated.View>
  );
};
const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export {AppLoading, type AppLoadingProps};
