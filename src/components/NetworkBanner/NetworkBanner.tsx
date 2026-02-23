import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated,
  Platform, ViewStyle, StyleProp
} from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Colors } from '@/constants/Colors';
import { 
  CustomIcon,CustomIconProps, CustomText
} from '@/components/custom';

const NetworkBanner: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const translateY = useRef(new Animated.Value(100)).current;

  const showBanner = useCallback(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected ?? false);
        showBanner();
      }
    });

    return () => unsubscribe();
  }, [isConnected, showBanner]);

  const backgroundColor = isConnected ? Colors.success : Colors.error;
  const iconName = isConnected ? 'wifi' : 'wifi-off';
  const message = isConnected ? 'Connexion rétablie' : 'Pas de connexion Internet';

  const iconProps: CustomIconProps = {
    iconName: "MaterialCommunityIcons",
    source: iconName,
    size: 18,
    color: Colors.primary,
    style: [{ marginRight: 8 }],
  }
  const containerStyle: StyleProp<ViewStyle> = [
    {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 30 : 10,
      left: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      zIndex: 999,
      elevation: 5,
      backgroundColor,
      transform: [{ translateY }],
    },
  ];

  return (
    <Animated.View style={containerStyle}>
      <CustomIcon {...iconProps} />
      <CustomText style={{ color: Colors.light, fontSize: 14 }}>{message}</CustomText>
    </Animated.View>
  );
};
export default NetworkBanner;