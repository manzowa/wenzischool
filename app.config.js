require("dotenv").config();

module.exports = {
  expo: {
    name: "Wenzischool",
    slug: "wenzischool",
    description: "Wenzischool affiche les écoles de Kinshasa et leurs coordonnées.",
    owner: "manzowa",
    version: process.env.APP_VERSION || "1.0.0",

    scheme: "wenzischool",

    orientation: "default",

    icon: "./assets/images/icon.png",

    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    assetBundlePatterns: [
      "**/*"
    ],

    updates: {
      url: "https://u.expo.dev/ab3b39e1-9899-417c-9140-0f0c89b70679"
    },

    runtimeVersion: {
      policy: "appVersion"
    },

    android: {
      package: "com.manzowa.wenzischool"
    },

    ios: {
      bundleIdentifier: "com.manzowa.wenzischool"
    },

    web: {
      bundler: "metro"
    },

    plugins: [
      "expo-font",
      "expo-web-browser",
      [
        "expo-screen-orientation",
        {
          "initialOrientation": "DEFAULT"
        }
      ],
      [
        "expo-build-properties",
        {
          "android": {
            compileSdkVersion: 36,
            targetSdkVersion: 36,
            buildToolsVersion: "36.0.0",
            enableProguardInReleaseBuilds: true
          }
        }
      ]
    ],

    extra: {
      API_URL: process.env.API_URL,
      APP_NAME: process.env.APP_NAME,
      APP_VERSION: process.env.APP_VERSION,

      eas: {
        projectId: "ab3b39e1-9899-417c-9140-0f0c89b70679"
      }
    }
  }
};