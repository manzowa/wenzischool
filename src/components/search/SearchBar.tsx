import React from 'react';
import { 
    StyleSheet, TextInput, TextInputProps, 
    View, Keyboard 
} from "react-native";
import { Colors } from '@/constants';
import { IconCustom } from '@/utils/custom';

type searchProps = TextInputProps &  {
    clicked: boolean,
    text: string,
    setText: Function,
    setClicked: Function,
}

export const SearchBar = (props : searchProps) => {
    const { clicked, text, setText, setClicked} = props;
    const handleChangeText = (text: any) => setText(text);
    const handleEndEditing = () => Keyboard.dismiss();
    const handleFocus = () => setClicked(true);
    const handlePress = () => {
        setClicked(false);
        setText("");
    };
    return (
        <View style={s.container}>
            <IconCustom 
              iconName={"Feather"}
              source={'search'} 
              color={Colors.primary} size={24} 
            />
            <TextInput
                style={s.input}
                placeholder="Recherche par nom école"
                value={text}
                onChangeText={handleChangeText}
                onEndEditing={handleEndEditing}
                onFocus={handleFocus}
                placeholderTextColor={Colors.primaryLight}
            />
            {clicked && (
                <IconCustom 
                    iconName={"Entypo"}
                    source={'cross'} 
                    color={Colors.primary} size={24} 
                    onPress={handlePress}
                    style={s.cross} 
                />
            )}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginTop: 20,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.primary
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 14,
        color: Colors.secondary,
    },
    cross: {
        paddingHorizontal: 5,
    },
});