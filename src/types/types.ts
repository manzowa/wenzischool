import { NavigatorScreenParams } from '@react-navigation/native';

// Auth 
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