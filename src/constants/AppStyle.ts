import { StyleSheet } from "react-native";

export const AppStyle = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex:-1
    },
    bg: {
       flex: 1
    },
    safeArea : {
        flex: 1
    },
    logo: {
        width: 220,
        height: 40
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    }
});