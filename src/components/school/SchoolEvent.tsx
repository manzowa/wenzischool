import React, { useCallback, useState } from "react";
import { TouchableOpacity, Animated} from "react-native";
import { Card } from "@/utils/card";
import { formatDate } from "@/utils/helpers";
import { TextCustom, IconCustom} from "@/utils/custom";
import { EventType } from "@/utils/types";
import { Colors, AppStyle } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/utils/types/types";
import Empty from '@/utils/Empty';

type SchoolEventProps = {
    evenements: EventType[];
};

type RenderRowProps = {
  iconName: any; 
  source: any; 
  text: string | React.ReactNode;
  key?: React.Key;
}
type NavigationProp = NativeStackNavigationProp<AppStackParamList, "App">;

const RenderRow: React.FC<RenderRowProps> = ({ iconName, source, text, key }) => (
  <Card.Row key={key}>
    <IconCustom
      iconName={iconName}
      size={24}
      color={Colors.primary}
      source={source}
    />
    <TextCustom type="caption" color="secondary">
      {text}
    </TextCustom>
  </Card.Row>
);

export const SchoolEvent = ({ evenements }: SchoolEventProps) => {
    const navigation = useNavigation<NavigationProp>();
    const [scale] = useState(new Animated.Value(1));
    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.75,  
            useNativeDriver: true,  
        }).start();
    };
     const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1, 
            useNativeDriver: true,
        }).start();
    };
    const goToEventDetail = useCallback((eventId: string) => {
        navigation.navigate("EventDetail", { eventId });
      }, [navigation]);
    return (
        <Card>
            <Card.Header>
               <Card.Title>Événements de l'école</Card.Title>
            </Card.Header>
            <Card.Body>
                {evenements && evenements.length > 0 ? (
                    evenements.map((evenement, index) => (
                        <TouchableOpacity 
                            key={evenement.id}
                            activeOpacity={0.7}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={() => {
                                goToEventDetail(evenement.id.toString());
                            }}
                        >
                        <Animated.View 
                            style={[
                                AppStyle.dottedLine, { transform: [{ scale },  { translateY: scale.interpolate({ inputRange: [0, 1], outputRange: [5, 0] }) }] }]
                            }
                        >
                                <RenderRow 
                                    iconName="MaterialIcons" 
                                    source="title" 
                                    text={evenement.titre}  
                                />
                                <RenderRow 
                                    iconName="MaterialIcons" 
                                    source="calendar-today" 
                                    text={formatDate(evenement.date, true)}  
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Empty message='Aucun événement disponible' />
                )}
            </Card.Body>
        </Card>
    );
};