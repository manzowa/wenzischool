import React, { useMemo } from "react";
import { View } from 'react-native';
import { useAppStyle } from "@/constants";
import { formatAdresse, capitalize } from "@/utils";
import { SchoolType, ImageType } from "@/types";
import { 
  CustomText,
  CustomIcon,CustomIconProps
} from "@/components/custom";
import { useTheme } from "@/hooks";


// --- Reusable Item Component ---
type ItemProps = {
  iconName: any;
  source: string;
  id: string,
  nom: string;
  adresses: string;
};

const Item = React.memo(({ iconName, source, id, nom, adresses }: ItemProps) => { 
  const { theme } = useTheme();
  const ss = useAppStyle({ theme });

  const iconProps: CustomIconProps = {
    iconName: iconName,
    source: source,
    size: 24,
    style: ss.icon
  };


  return (
    <View style={ss.schoolItemContainer} key={id.toString()}>
      <CustomIcon {...iconProps}/>
      <View style={ss.schoolItemTextContainer}>
        <CustomText style={[{ color: theme.colors.primary }, ss.small]}>{nom}</CustomText>
        <CustomText style={[{ color: theme.colors.secondary }, ss.extraSmall]}>{adresses}</CustomText>
      </View>
    </View>
  )
});
Item.displayName = "SchoolItem.Item";

// --- Optimized SchoolItem Component ---
export type SchoolItemProps = {
  item: SchoolType; 
};

export const SchoolItem = React.memo(({ id, nom, images, adresses}: SchoolType) => {
  const logo: ImageType | undefined = useMemo(() => {
    return images?.find((image: ImageType) =>
      image.filename?.toLowerCase().includes("logo")
    );
  }, [images]);

  const formattedName = useMemo(() => capitalize(nom), [nom]);
  const formattedAddress = useMemo(() => formatAdresse(adresses?.[0]), [adresses]);

  const iconName = logo ? "Logo" : "Ionicons";
  const source = logo?.url ?? "school-sharp";
  const itemProps: ItemProps = {
    iconName: iconName,
    source: source,
    id : id.toString(),
    nom: formattedName,
    adresses: formattedAddress
  }
    
  return (<Item {...itemProps} />  );
});
SchoolItem.displayName = "SchoolItem";
