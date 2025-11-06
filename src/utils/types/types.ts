import { NavigatorScreenParams , RouteProp} from '@react-navigation/native';

// Écrans school
export type SchoolStackParamList = {
  Home: undefined;
  Event: undefined;
  Search: undefined;
};
// Écrans de l'application
export type AppStackParamList = {
    App: NavigatorScreenParams<SchoolStackParamList>,
    School: { schoolid: string },
    Support: undefined,
    EventDetail: { eventId: string}
};

// Type pour la route de l'écran School
export type SchoolScreenRouteProp = RouteProp<AppStackParamList, 'School'>;
export interface SchoolScreenProps {
  route: SchoolScreenRouteProp;
}

// Type pour la route de l'écran EventDetail
export type EventDetailScreenRouteProp = RouteProp<AppStackParamList, 'EventDetail'>;
export interface EventDetailScreenProps {
  route: EventDetailScreenRouteProp;
}