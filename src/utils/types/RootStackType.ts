import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavBottomTabListType } from '@/utils/types';

export type RootStackType = {
    MainNav: NativeStackScreenProps<NavBottomTabListType>,
    School: { 
        schoolId: string 
    },
    Support: {}
};