import {
  StyleSheet, TextStyle, ViewStyle,
  Platform, Dimensions, PixelRatio
} from "react-native";
import { Colors } from "./Colors";

// Police de base selon la plateforme
const baseFontFamily = Platform.select({
  ios: "System",
  android: "sans-serif",
  default: "System",
});
const LETTER_SPACING = 0.1;
const CARD_RADIUS = 4;
const CARD_PADDING = 4;
const CARD_TEXT_PADDING = 10;
const BUTTON_RADIUS = 8;
const BUTTON_PADDING_Y = 12;
const BUTTON_PADDING_X = 24;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // 375 = largeur iPhone 11

const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const textStyle = (size: number, lineHeight: number): TextStyle => ({
  fontFamily: baseFontFamily,
  fontSize: normalize(size),
  lineHeight: normalize(lineHeight),
  letterSpacing: LETTER_SPACING,
});

const cardShadow: ViewStyle = Platform.select({
  ios: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  android: {
    elevation: 5,
  },
}) as ViewStyle;

const cardTextBase: TextStyle = {
  fontFamily: baseFontFamily,
  color: Colors.primary,
  padding: CARD_TEXT_PADDING,
};

const buttonShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  android: {
    elevation: 4,
  },
}) as ViewStyle;

const buttonBase: ViewStyle = {
  paddingVertical: BUTTON_PADDING_Y,
  paddingHorizontal: BUTTON_PADDING_X,
  borderRadius: BUTTON_RADIUS,
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonTextBase: TextStyle = {
  fontFamily: baseFontFamily,
  fontWeight: '700',
};

export const AppStyle = StyleSheet.create({
  // Background image
  background: {
    flex: 1
  },
  bg: { flex: 1 },
  safeArea: {
    flex: 1
  },
  logo: {
    width: 220,
    height: 40,
  },
  icon: {
    padding: 10,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowColor: Colors.primary,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: textStyle(24, 32),
  subtitle: textStyle(18, 26),
  body: textStyle(16, 24),
  caption: textStyle(12, 18),
  medium: textStyle(10, 14),
  small: textStyle(8, 12),

  card: {
    marginTop: 10,
    paddingHorizontal: CARD_PADDING,
    paddingTop: CARD_PADDING,
    paddingBottom: 8,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: Colors.light,
    backgroundColor: Colors.light,
    ...cardShadow,
  },

  cardHeader: {
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    borderRadius: CARD_RADIUS,
    marginBottom: 5,
  },

  cardBody: {
    paddingHorizontal: CARD_PADDING,
  },

  cardRow: {
    flexDirection: 'row',
    gap: 2,
  },

  cardTitle: {
    ...cardTextBase,
    fontSize: 14,
    fontWeight: '700',
  },

  cardSubtitle: {
    ...cardTextBase,
    fontSize: 16,
    fontWeight: '700',
  },

  cardText: {
    ...cardTextBase,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400'
  },

  button: {
    ...buttonBase,
    ...buttonShadow,
  },

  buttonText: {
    ...buttonTextBase,
    fontSize: 12,
    paddingHorizontal: 12,
  },

  buttonTextDefault: {
    ...buttonTextBase,
    fontSize: 16,
    color: Colors.light,
  },
  buttonTextDark: {
    ...buttonTextBase,
    fontSize: 16,
    color: Colors.secondary,
  },

  defaultTheme: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
  },

  darkTheme: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
  },

  welcomeContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    padding: 10,
    margin: 20,
    elevation: 3,
  },
  logoContainer: {
    flex: 1,
    margin: 20,
    padding: 5,
  },
  gistContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gistContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    gap: 5
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
  },
  infoRowContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoTextRowContent: {
    flex: 2,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.light,
  },
  infoIconRowContent: {
    flex: 1,
    color: Colors.light,
  },
  supportContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  supportContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    padding: 5,
    marginBottom: 5,
    zIndex: 3,
  },
  supportText: {
    flex: 2,
    color: Colors.primary,
    fontSize: 12,
    textAlign: "justify",
    lineHeight: 18,
  },
  schoolWidgetContainer: {
    padding: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  schoolWidgetEmptyContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  appLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  appLoadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  widgetContainer: {
    padding: 4,
    marginVertical: 10,
    marginHorizontal: 20
  },
  widgetEmptyContainer: {
    marginTop: 10,
    alignItems: "center",
  },

  boxShadow: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        shadowRadius: 2,
        elevation: 5,
      },
    }),
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dotted',
    padding: 4,
    marginVertical: 10,
  }
});
