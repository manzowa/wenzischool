import { ImageSourcePropType } from 'react-native';

type ImageKey =
  | 'logo'
  | 'logoHorizontal'
  | 'background'
  | 'home'
  | 'logout'
  | 'searchIcon'
  | 'shareIcon'
  | 'infoIcon'
  | 'contactIcon'
  | 'newsIcon'
  | 'schoolIcon'
  | 'settingsIcon'
  | 'townIcon'
  | 'countryIcon';

type ImageType = Partial<Record<ImageKey, ImageSourcePropType>>;
export const AppImages: ImageType = {
    logo: require('../../assets/images/logo-sign.webp'),
    logoHorizontal: require('../../assets/images/horizontal.webp'),
    background: require('../../assets/images/bg.webp'),
    townIcon: require('../../assets/images/Kinshasa.webp')
};