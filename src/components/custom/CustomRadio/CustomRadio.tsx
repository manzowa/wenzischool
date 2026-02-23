import React, { createContext, useContext } from 'react';
import {
    View, StyleProp, ViewStyle,
    TouchableOpacity,
} from 'react-native';
import { CustomText } from "@/components/custom/CustomText";

export type CustomRadioProps = React.PropsWithChildren<{
    value: string,
    label?: string,
    selected?: boolean;
    onPress?: () => void,
    borderColor?: string,
    backgroundColor?: string,
    color?: string,
    style?: StyleProp<ViewStyle>
}>;
export type CustomRadioGroupProps = {
    value: string;
    onValueChange: (value: string) => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};
type RadioGroupContextType = {
    selectedValue?: string;
    onValueChange?: (value: string) => void;
};

/* =========================================================
   CONTEXT
========================================================= */
const RadioGroupContext = createContext<RadioGroupContextType>({});

/* =========================================================
   RADIO COMPONENT
========================================================= */
type CustomRadioComponent = React.FC<CustomRadioProps> & {
    Group: React.FC<CustomRadioGroupProps>;
};

const CustomRadio: CustomRadioComponent = ({
    value,
    label,
    selected,
    onPress,
    borderColor = "red",
    backgroundColor = "red",
    color = "red",
    children,
    style,
}) => {

    const { selectedValue, onValueChange } = useContext(RadioGroupContext);
    const isSelected =
        selectedValue !== undefined
            ? selectedValue === value
            : selected ?? false;


    const handlePress = () => {
        if (onValueChange) {
            onValueChange(value);
        }
        onPress?.();
    };

    const outerRadioStyle: StyleProp<ViewStyle> = {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: borderColor

    }
    const innerRadioStyle: StyleProp<ViewStyle> = {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: backgroundColor
    };
    const childrenStyle: StyleProp<ViewStyle> = {
        flexDirection: 'row',
        alignItems: 'center'
    };
    const btnRadioStyle: StyleProp<ViewStyle> = {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical:10,
        alignItems: 'center',
        justifyContent: "space-between"
    };
    return (
        <TouchableOpacity onPress={handlePress} style={[btnRadioStyle, style]}>
            <View style={childrenStyle}>
                {children}
                {label && <CustomText style={{ color: color }}>{label}</CustomText>}
            </View>
            <View style={outerRadioStyle}>
                {isSelected && <View style={innerRadioStyle} />}
            </View>
        </TouchableOpacity>
    );
};

/* =========================================================
   GROUP COMPONENT
========================================================= */
const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
    value,
    onValueChange,
    style,
    children,
}) => {
    return (
        <RadioGroupContext.Provider
            value={{ selectedValue: value, onValueChange }}
        >
            <View style={style}>
                {children}
            </View>
        </RadioGroupContext.Provider>
    );
};
/* =========================================================
   ATTACH GROUP
========================================================= */

CustomRadio.Group = CustomRadioGroup;
export default CustomRadio;