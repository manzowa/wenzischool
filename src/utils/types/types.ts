import { NavigatorScreenParams , RouteProp} from '@react-navigation/native';

// Écrans school
export type SchoolStackParamList = {
    Home: undefined;
    Search: undefined;
};
// Écrans de l'application
export type AppStackParamList = {
    App: NavigatorScreenParams<SchoolStackParamList>,
    School: { schoolid: string },
    Support: undefined
};

// Model de l'école
export interface SchoolType {
    id: number;
    nom: string;
    telephone?: string;
    email?: string;
    site?: string;
    ecoleid?: any;
    adresses?: {
      voie: string;
      quartier: string;
      reference: string;
      commune: string;
      district: string;
      ville: string;
      ecoleid: number
    } | [] |any;
    images? : {
      id?: string|number;
      title?: string,
      filename?: string,
      mimetype?: string,
      ecoleid?: string|number;
      url?: string
    } | [] | any;
    [key: string]: any;
};

// Type pour la route de l'écran School
export type SchoolScreenRouteProp = RouteProp<AppStackParamList, 'School'>;
export interface SchoolScreenProp {
  route: SchoolScreenRouteProp;
}