import { 
    TextInput, TextInputProps, 
    View, Keyboard 
} from "react-native";
import { useAppStyle } from '@/constants';
import { 
   CustomIcon, CustomIconProps
} from '@/components/custom';
import { useTheme } from '@/hooks';

export type SearchBarProps = TextInputProps &  {
    clicked: boolean,
    text: string,
    setText: Function,
    setClicked: Function,
    placeholder?: string,
    placeholderTextColor?: string,
}

export const SearchBar = ({
    clicked, text, setText, setClicked,
    placeholder, placeholderTextColor
} : SearchBarProps
) => {
    const { theme } = useTheme();
    const ss = useAppStyle({ theme });
    
    const handleChangeText = (text: any) => setText(text);
    const handleEndEditing = () => Keyboard.dismiss();
    const handleFocus = () => setClicked(true);
    const handlePress = () => {
        setClicked(false);
        setText("");
    };
    const iconSearchProps: CustomIconProps = {
        iconName: "Feather",
        source: "search",
        color: theme.colors.primary,
        size: 24
    };
    const iconCrossProps: CustomIconProps = {
        iconName: "Entypo",
        source: "cross",
        color: theme.colors.primary,
        size: 24,
        onPress: handlePress,
        style: ss.searchBarCross
    };
    const inputProps: TextInputProps = {
        style: ss.searchBarInput,
        placeholder: placeholder || "Recherche par nom école",
        value: text,
        onChangeText: handleChangeText,
        onEndEditing: handleEndEditing,
        onFocus: handleFocus,
        placeholderTextColor: placeholderTextColor || theme.colors.primary,
    };

    return (
        <View style={ss.searchBarContainer}>
            <CustomIcon {...iconSearchProps} />
            <TextInput {...inputProps} />
            {clicked && (<CustomIcon {...iconCrossProps} />)}
        </View>
    );
}