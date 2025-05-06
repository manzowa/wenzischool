import { forwardRef, Ref } from "react";
import { View, ViewProps, StyleSheet} from 'react-native';
import { Colors } from "@/constants";

export const Widget = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View {...props} ref={ref}>
          {children}
        </View>
    )
});

const s = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Comfortaa-Light',
        color: Colors.secondary,
        margin: 10
    },
});