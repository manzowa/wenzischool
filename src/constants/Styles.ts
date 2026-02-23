import { useMemo } from 'react';
import {
  StyleSheet,
  TextStyle,
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native';
import { ThemeProps } from "@/theme";


// @Props
export type AppStyleProps = {
  theme: ThemeProps;
}
// @Return
export type AppStyleResult = {
  styles: any;
}

const createStyles = ({ theme }: AppStyleProps) => {

  const { width } = Dimensions.get('window');
  const scale = width / 375; // 375 = largeur iPhone 11

  const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scale));
  const textStyle = (
    fontFamily: string, size: number,
    lineH: number, weight: TextStyle['fontWeight'] = '400'
  ): TextStyle => ({
    fontFamily: fontFamily,
    fontWeight: weight,
    fontSize: normalize(size),
    lineHeight: normalize(lineH)
  });

  const shadowStyle = (
    shadowColor = theme.colors.primary, 
    iosRadius = theme.radius.sm, 
    androidRadius = theme.radius.xs, elevation = 5
  ) => ({
    ...Platform.select({
      ios: { 
        shadowOffset: { width: 0, height: 4 }, 
        shadowColor, 
        shadowOpacity: 0.3, shadowRadius: iosRadius 
      },
      android: { shadowRadius: androidRadius, elevation },
    }),
  });

  return StyleSheet.create({
    // Base style
    flex: { flex: 1 },
    logo: { width: 220, height: 40 },
    container: {
      flex: 1,
      margin: theme.spacing.sm,
      padding: theme.spacing.md
    },
    filterContainer: {
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: theme.border.xs, 
      borderRadius: theme.radius.md,
      ...shadowStyle(theme.colors.black, 2, 2, 5)
    },
    eventFilterContainer: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 1, 
      borderRadius: 5,
      // padding: 10,
      ...shadowStyle(theme.colors.black, 2, 2, 5)
    },
    welcomeContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
      padding: 10,
      margin: 20,
      ...shadowStyle(theme.colors.primary, theme.radius.sm, theme.radius.xs, 3)
    },
    scrollContainer: { flexGrow: 1, justifyContent: "center" },
    shadow: shadowStyle(),
    center: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    bold: { fontWeight: 'bold', marginLeft: 2 },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.light,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: theme.colors.primary,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginBottom: 10,
      borderRadius: 8,
      alignItems: 'center'
    },
    // Icon style
    icon: {
      padding: 10,
      width: 45,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      color: theme.colors.light,
      backgroundColor: theme.colors.primary,
      ...shadowStyle(theme.colors.primary, theme.radius.sm, theme.radius.xs, 3)
    },
    iconAlter: {
      padding: 10,
      width: 45,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      color: theme.colors.primary,
      backgroundColor: theme.colors.light,
      ...shadowStyle(theme.colors.primary, theme.radius.sm, theme.radius.xs, 3)
    },
    supportIcon: {
      padding: 10,
      width: 75,
      height: 75,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      ...shadowStyle(theme.colors.primary, 6, 5, 5)
    },
    // Text styles
    title: textStyle(
      theme.fonts.heavy.fontFamily, 
      theme.fontSizes.xl, theme.lineHeights.xl, '900'
    ),
    subtitle: textStyle(
      theme.fonts.bold.fontFamily, theme.fontSizes.lg, 
      theme.lineHeights.lg, '700'
    ),
    medium: textStyle(
      theme.fonts.medium.fontFamily, 
      theme.fontSizes.md, theme.lineHeights.md, '500'
    ),
    small: textStyle(
      theme.fonts.regular.fontFamily, 
      theme.fontSizes.sm, theme.lineHeights.sm, '400'
    ),
    extraSmall: textStyle(
      theme.fonts.regular.fontFamily, 
      theme.fontSizes.xs, theme.lineHeights.sm, '400'
    ),

    //Widget styles
    widgetEmptyContainer: { marginTop: 10, alignItems: "center" },
    widgetContainer: {
      marginVertical: 10,
      marginHorizontal: 10
    },
    settingsWidgetContainer: {
      flex: 1,
      marginBottom: 10,
    },
    settingsWidgetContent:{
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      padding: 10,
      
    },
    settingsWidgetTitle: {
      color: theme.colors.secondary,
      fontFamily: theme.fonts.medium.fontFamily,
      fontWeight:'500',
      fontSize: normalize(theme.fontSizes.md),
      lineHeight: normalize(theme.lineHeights.md)
      
    },
    settingsWidgetFlag: {
      padding: 10,
      width: 25,
      height: 25,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      color: theme.colors.primary,
      backgroundColor: theme.colors.light,
      ...shadowStyle(theme.colors.primary, theme.radius.sm, theme.radius.xs, 3)
    },
    infoContainer: {flex: 1, backgroundColor: theme.colors.primary },
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
      color: theme.colors.light,
    },
    infoIconRowContent: {
      flex: 1,
      color: theme.colors.light,
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
      color: theme.colors.primary,
      fontSize: 12,
      textAlign: "justify",
      lineHeight: 18,
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

    //school screen styles
    schoolContent: { marginBottom: 20, marginTop: 10 },
    schoolCoordonneeButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5, padding: 6,
      ...shadowStyle(theme.colors.black, 3.84, 0, 4)
    },
    schoolEventDottedLine: {
      borderColor: theme.colors.primary,
      borderBottomWidth: 1, borderLeftWidth: 1,
      borderStyle: 'dotted',
      padding: 4, marginVertical: 10,
    },
    schoolItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    schoolItemTextContainer: {
      flex: 1,
      marginLeft: 10,
    },
    // EventScreen styles
    eventContent: {
      backgroundColor: theme.colors.primary,
      marginTop: 20, marginBottom: 10,
      marginHorizontal: 6, padding: 8,
      borderRadius: 8
    },
    eventContentFilter: { 
      flexDirection: "row", 
      alignItems: "center"
    },
    eventContentFilterDate: {
      backgroundColor: theme.colors.light,
      paddingVertical: 15, paddingHorizontal: 12,
      marginRight: 10, borderRadius: 4,
    },
    eventContentFilterTown: {
      backgroundColor: theme.colors.light,
      flex: 1, borderRadius: 4
    },
    eventFilterContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    // EventDetail styles
    eventDetailContainer: {
      flexDirection: "row", alignItems: "flex-start",
      marginBottom: 5,
      padding: 2
    },
    eventDetailImage: {
      width: "100%", height: 200,
      marginBottom: 16, borderRadius: 10,
      resizeMode: "cover"
    },
    eventDetailCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
    // EventItem styles
    eventItemContainer: {
      backgroundColor: theme.colors.light,
      flexDirection: "row", padding: 2,
      borderRadius: 8, gap: 4,
      position: "relative"
    },
    eventItemImage: {
      backgroundColor: theme.colors.gray,
      width: 140, height: 200,
      borderRadius: 8,
      resizeMode: "cover",
    },
    eventItemRowed: {
      flexDirection: "row", alignItems: "flex-start",
      paddingRight: 15
    },
    eventItemIcon: {
      color: theme.colors.primary,
      marginTop: 2, marginRight: 8,
    },
    eventItemStatus: {
      backgroundColor: theme.colors.light,
      borderColor: theme.colors.light,
      paddingHorizontal: 12,
      paddingVertical: 4,
      position: 'absolute',
      top: 8, left: 5, opacity: 0.8,
      borderWidth: 1, borderRadius: 4,
    },
    // Support styles

    supportAssistance: {
      backgroundColor: theme.colors.light,
      padding: 10, alignItems: "center",
      borderRadius: 5,
    },
    supportInfo: { alignItems: "center" },
    supportFaq: { alignItems: "center", marginTop: 10 },
    supportButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5, margin: 10, padding: 20,
      ...shadowStyle(theme.colors.black, 3.84, 0, 4)
    },
    // Search Event styles
    searchContainer: {},
    searchIndicator: { marginVertical: 10 },
    searchErrorText: { 
      color: theme.colors.error, 
      marginVertical: 10, 
      textAlign: "center" 
    },
    searchNoResult: { 
      color: theme.colors.gray, 
      textAlign: "center", 
      marginVertical: 10, 
      fontStyle: "italic" 
    },
    // search Bar styles
    searchBarContainer: {
      backgroundColor: theme.colors.light,
      borderColor: theme.colors.primary,
      justifyContent: 'space-between',
      alignItems: 'center', flexDirection: 'row',
      borderRadius: 10, marginTop: 20, padding: 4,
      borderWidth: 1,
    },
    searchBarInput: {
      color: theme.colors.secondary,
      flex: 1, paddingHorizontal: 10,
      fontSize: theme.fontSizes.sm,

    },
    searchBarCross: { paddingHorizontal: 5 },

    // Setting styles
    settingContainer: {
      flex: 1, alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.error
    },
    // ImageSlider styles
    imageSliderContainer: { flex: 1 , borderRadius: theme.radius.md, overflow: 'hidden' },
    imageSliderContent: { height: '100%' },
    imageSliderImage: { height: '100%', resizeMode: 'cover' },
    imageSliderItemContainer: { position: 'relative' },
    imageSliderPagination: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
    imageSliderDot: { width: 8, height: 8, borderRadius: theme.radius.sm, margin: 4 },
    imageSliderActiveDot: { backgroundColor: theme.colors.primary },
    imageSliderInActiveDot: { backgroundColor: theme.colors.light },
    imageSliderButton: {
      backgroundColor: theme.colors.primary,
      position: 'absolute', top: 10, right: 10,
      paddingHorizontal: 12, paddingVertical: 6,
      borderRadius: 6,
    },
    imageSliderButtonText: { color: theme.colors.light, fontWeight: 'bold' },
    imageSliderCaptionContainer: {
      backgroundColor: theme.colors.grayLight,
      opacity: 1,
      position: 'absolute', width: '100%',
      bottom: 0, padding: 8,
    },
    imageSliderCaptionText: { color: theme.colors.light, fontWeight: 'bold', fontSize: theme.fontSizes.sm },
    imageSliderCaptionSubText: { color: theme.colors.gray, fontSize: theme.fontSizes.xs },

    // Card styles
    card: {
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.md,
      paddingHorizontal: theme.spacing.xs,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.md,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.light, 
      backgroundColor: theme.colors.light,
      ...shadowStyle(theme.colors.primary)
    },
    cardHeader: {
      borderColor: theme.colors.primary,
      borderBottomWidth: theme.border.xs,
      borderRadius: theme.border.md, 
      marginBottom: 5
    },
    cardBody: { paddingHorizontal: 4 },
    cardRow: { flexDirection: 'row', gap: 2 },
    cardTitle: {
      fontFamily: theme.fonts.heavy.fontFamily,
      fontWeight: theme.fonts.heavy.fontWeight,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
      color: theme.colors.primary,
      padding: theme.spacing.xs, 
    },
    cardSubtitle: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontWeight: theme.fonts.bold.fontWeight,
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeights.md,
      color: theme.colors.primary, 
      padding: theme.spacing.md,  
     
    },
    cardText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: theme.fonts.regular.fontWeight,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      color: theme.colors.primary,
      padding: theme.spacing.xs,
    },
    btn: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      alignItems: 'center',
    },

    // Block Widget styles
    blockWidgetContainer: {
      marginBottom: theme.spacing.md,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md, 
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1, 
      borderRadius: theme.radius.md,
      ...shadowStyle(theme.colors.black, 2, 2, 5)
    },
    blockWidgetText: { 
      flex: 2,
      color: theme.colors.light, 
      marginHorizontal: 10, 
       fontWeight: "bold" 
    },
    blockWidgetTheme: { 
      backgroundColor: theme.colors.light, 
      borderColor: theme.colors.primary 
    }
  });
}

// @hook use
export const useAppStyle = ({ theme }: AppStyleProps) => {
  return useMemo(() => createStyles({ theme }), [theme]);
};

export default createStyles;
