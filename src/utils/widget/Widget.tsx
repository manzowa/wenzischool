import { forwardRef } from "react";
import { View, ViewProps, Button } from "react-native";
import { Image, ImageProps } from "expo-image";
import { AppStyle, Colors } from "@/constants";
import { TextCustom, IconCustom } from "@/utils/custom";

// === Widget générique ===
export const Widget = forwardRef<View, ViewProps>(({ children, ...props }, ref) => (
  <View {...props} ref={ref}>
    {children}
  </View>
));
Widget.displayName = "Widget";

// === Welcome Widget ===
export const WelcomeWidget = () => (
  <Widget style={AppStyle.welcomeContainer}>
    <TextCustom color="light" type="caption">Salut,</TextCustom>
    <TextCustom color="light" type="caption">
      Renseignez-vous sur vos écoles préférées
    </TextCustom>
  </Widget>
);

// === Logo Horizontal Widget ===
export const LogoHorizontalWidget = (props: ImageProps) => (
  <Widget style={AppStyle.logoContainer}>
    <Image {...props} contentFit="cover" />
  </Widget>
);

// === Gist Widget ===
type NavigationProp = {
  navigate: (screen: string) => void;
};

type GistWidgetProps = {
  navigation: NavigationProp;
};

export const GistWidget = ({ navigation }: GistWidgetProps) => {
  const handlePress = () => navigation.navigate("Search");

  return (
    <Widget style={AppStyle.gistContainer}>
      <TextCustom color="secondary">
        Découvrez l'essentiel de nos écoles
      </TextCustom>
      <View style={AppStyle.gistContent}>
        <IconCustom
          iconName="Ionicons"
          source="search"
          style={[AppStyle.icon, AppStyle.defaultTheme, { color: Colors.primary }]}
          onPress={handlePress}
        />
      </View>
    </Widget>
  );
};

// === Info Widget ===
type InfoWidgetProps = {
  navigation: NavigationProp;
};

export const InfoWidget = ({ navigation }: InfoWidgetProps) => {
  const handlePress = () => navigation.navigate("Support");

  return (
    <Widget style={AppStyle.infoContainer}>
      <View>
        <TextCustom color="light">Besoin d'aide ?</TextCustom>
        <View style={AppStyle.infoRowContent}>
          <TextCustom
            type="caption"
            style={AppStyle.infoTextRowContent}
          >
            Trouvez rapidement des réponses ou contactez l'un de nos agents.
          </TextCustom>
          <IconCustom
            iconName="AntDesign"
            source="questioncircle"
            size={80}
            style={AppStyle.infoIconRowContent}
          />
        </View>
        <Button
          title="Espace ASSISTANCE"
          color={Colors.warning}
          onPress={handlePress}
        />
      </View>
    </Widget>
  );
};

// === Support Widget ===
export const SupportWidget = () => (
  <Widget style={AppStyle.supportContainer}>
    <TextCustom color="primary">Support technique</TextCustom>
    <View style={AppStyle.supportContent}>
      <IconCustom
        iconName="AntDesign"
        source="infocirlce"
        size={80}
        color={Colors.primary}
      />
      <TextCustom
        type="caption"
        style={AppStyle.supportText}
      >
        Certaines des adresses actuelles ne sont pas très précises. 
        Nous travaillons à leur amélioration et vous remercions de votre compréhension.
      </TextCustom>
    </View>
  </Widget>
);
