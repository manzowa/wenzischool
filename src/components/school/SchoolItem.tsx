import React, { useMemo } from "react";
import { StyleSheet, View } from 'react-native';
import { Colors } from "@/constants";
import { IconCustom, TextCustom } from "@/utils/custom";
import { formatAdresse, capitalize } from "@/utils/helpers";
import { SchoolType } from "@/utils/types";

type SchoolImage = SchoolType['images'][number];

// --- Reusable Item Component ---
type ItemType = {
  iconName: any;
  source: string;
  nom: string;
  adresses: string;
};

const Item = React.memo(({ iconName, source, nom, adresses }: ItemType) => (
  <View style={styles.itemContainer}>
    <IconCustom
      iconName={iconName}
      source={source}
      size={24}
      style={styles.itemIcon}
      color={Colors.light}
    />
    <View style={styles.itemTextContainer}>
      <TextCustom type="caption" color="primary">{nom}</TextCustom>
      <TextCustom type="caption" color="secondary">{adresses}</TextCustom>
    </View>
  </View>
));
Item.displayName = "SchoolItem.Item";

// --- Optimized SchoolItem Component ---
export const SchoolItem = React.memo(({ nom, adresses, images }: SchoolType) => {
  const logo: SchoolImage | undefined = useMemo(() => {
    return images.find((image: SchoolImage) =>
      image.filename?.toLowerCase().includes("logo")
    );
  }, [images]);

  const formattedName = useMemo(() => capitalize(nom), [nom]);
  const formattedAddress = useMemo(() => formatAdresse(adresses?.[0] ?? ""), [adresses]);

  const iconName = logo ? "Logo" : "Ionicons";
  const source = logo?.url ?? "school-sharp";

  return (
    <Item
      iconName={iconName}
      source={source}
      nom={formattedName}
      adresses={formattedAddress}
    />
  );
});
SchoolItem.displayName = "SchoolItem";

// --- Styles ---
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemIcon: {
    padding: 10,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 1,
  },
});
