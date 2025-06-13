import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, Options } from "@/constants";
import { IconCustom, TextCustom } from "@/utils/custom";
import {
  formatAdresse,
  capitalize,
  getArrayLogo,
  iconSchool,
} from "@/utils/util";
import { SchoolType } from "@/utils/types";

// --- Reusable Item Component ---
type ItemType = {
  iconName: string;
  source: string;
  nom: string;
  adresses: string;
};

const Item = React.memo(({ iconName, source, nom, adresses }: ItemType) => (
  <View style={s.itemContainer}>
    <IconCustom
      iconName={iconName}
      source={source}
      size={24}
      style={s.itemIcon}
      color={Colors.light}
    />
    <View style={s.itemRow}>
      <TextCustom children={nom} type="caption" color="primary" />
      <TextCustom children={adresses} type="caption" color="secondary" />
    </View>
  </View>
));

// --- Optimized SchoolItem Component ---
export const SchoolItem = React.memo((props: SchoolType) => {
  const { nom, adresses, images } = props;

  const oLogo = useMemo(() => {
    const arr = getArrayLogo(images);
    return arr.length > 0 ? arr[0] : null;
  }, [images]);

  const ecoleid = oLogo?.ecoleid ?? 0;
  const pathImage = `${Options.apiUrl}ecoles/${ecoleid}/images`;

  const source = useMemo(() => {
    return oLogo ? `${pathImage}/${oLogo.id}` : "school-sharp";
  }, [oLogo, pathImage]);

  return (
    <Item
      iconName={iconSchool(!!oLogo)}
      source={source}
      nom={capitalize(nom)}
      adresses={formatAdresse(adresses?.[0])}
    />
  );
});

// --- Styles ---
const s = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  itemRow: {
    flex: 3,
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
  },
});
