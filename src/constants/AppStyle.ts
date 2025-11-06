import {
  StyleSheet, Platform,
  Dimensions, PixelRatio
} from "react-native";
import { Colors } from "./Colors";

// Police de base selon la plateforme
const baseFontFamily = Platform.select({
  ios: "System",
  android: "sans-serif",
  default: "System",
});

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // 375 = largeur iPhone 11

const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const AppStyle = StyleSheet.create({
  // Background image
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  bg: { flex: 1},
  safeArea: { flex: 1, backgroundColor: Colors.light },
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
  title: {
    fontFamily: baseFontFamily,
    fontSize: normalize(24),
    lineHeight: normalize(32),
    letterSpacing: 0.1
  },
  subtitle: {
    fontFamily: baseFontFamily,
    fontSize: normalize(18),
    lineHeight: normalize(26),
    letterSpacing: 0.1,
  },
  body: {
    fontFamily: baseFontFamily,
    fontSize: normalize(16),
    lineHeight: normalize(24),
    letterSpacing: 0.1,
  },
  caption: {
    fontFamily: baseFontFamily,
    fontSize: normalize(12),
    lineHeight: normalize(18),
    letterSpacing: 0.1
  },
  medium: {
    fontFamily: baseFontFamily,
    fontSize: normalize(10),
    lineHeight: normalize(14),
    letterSpacing: 0.1,
  },
  small: {
    fontFamily: baseFontFamily,
    fontSize: normalize(8),
    lineHeight: normalize(12),
    letterSpacing: 0.1,
  },
  card: {
    marginTop: 10,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light,
    backgroundColor: Colors.light,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    marginBottom: 5,
  },
  cardBody: {
    paddingHorizontal: 4,
  },
  cardRow: {
    flexDirection: "row",
    gap: 2,
  },
  cardTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: baseFontFamily,
    color: Colors.primary,
  },
  cardSubtitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: baseFontFamily,
    color: Colors.primary,
  },
  cardText: {
    padding: 10,
    fontSize: 14,
    fontFamily: baseFontFamily,
    lineHeight: 20,
    color: Colors.primary,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        elevation: 4,
        shadowColor: Colors.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    fontFamily: baseFontFamily,
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },
  defaultTheme: {
    backgroundColor: Colors.light,
    shadowColor: Colors.light
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
  buttonTextDefault: {
    fontSize: 16,
    color: Colors.light,
    fontFamily: baseFontFamily,
  },
  buttonTextDark: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: baseFontFamily,
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
  },
  errorText: {}
});
