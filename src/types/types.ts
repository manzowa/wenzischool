import { NavigatorScreenParams , RouteProp} from '@react-navigation/native';

// 
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
// Écrans de l'application
export type AppStackParamList    = {
  Home: undefined;
  Event: undefined;
  Search: undefined;
  Settings: undefined;
};
// Écrans RootStackParamList
export type RootStackParamList = {
  App: NavigatorScreenParams<AppStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  School: { schoolid: string };
  Support: undefined;
  EventDetail: { eventId: string};
  Profile: { userId: string };
};
// Type pour la route de l'écran School
export type SchoolScreenRouteProp = RouteProp<RootStackParamList, 'School'>;
export interface SchoolScreenProps {
  route: SchoolScreenRouteProp;
}
// Type pour la route de l'écran EventDetail
export type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
export interface EventDetailScreenProps {
  route: EventDetailScreenRouteProp;
}