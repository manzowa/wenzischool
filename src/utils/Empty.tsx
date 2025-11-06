import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { IconCustom, TextCustom } from '@/utils/custom';
import { Colors } from '@/constants';

interface EmptyProps {
    message?: string;
}

const Empty: React.FC<EmptyProps> = ({ message = "Aucune donnée disponible" }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1, // Taille finale
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);
    return (
        <View style={{
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0'
        }}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <IconCustom
                    iconName="MaterialIcons"
                    source="image-not-supported"
                    size={40}
                    color={Colors.primary}
                />
            </Animated.View>
            <Animated.View style={{ opacity: fadeAnim }}>
                <TextCustom style={{
                    color: '#888',
                    fontSize: 14,
                    fontStyle: 'italic'
                }}>{message}</TextCustom>
            </Animated.View>
        </View>
    );
};
export default Empty;