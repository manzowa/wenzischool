import React, { useState } from "react";
import {
  ScrollView, ScrollViewProps,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ThemeProps } from "@/theme";
import { useAppStyle } from "@/constants/Styles";
import {
  Widget,
} from "@/components/common/widgets"
import { CustomButton, CustomText } from '@/components/custom';
import { Image, ImageProps } from "expo-image";
import { Colors } from "@/constants";

export type LoginContentProps = {
  theme: ThemeProps;
  scrollViewProps?: ScrollViewProps;
};

export default function LoginContent({
  theme, scrollViewProps
}: LoginContentProps) {
  const ss = useAppStyle({ theme });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const isFormValid = email && password.length >= 6 && isValidEmail(email);

  const handleLogin = async () => {
    if (!isFormValid) {
      setError("Veuillez remplir correctement les champs.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("https://your-api.com/login", {
        email,
        password,
      });

      const token = response.data.token;

      console.log("Connecté :", token);
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const image: ImageProps = {
    source: theme.images.splashIcon,
    style: {
      width: 100,
      height: 100,
      borderRadius: 20,
      marginBottom: 10
    }
  };


  return (
    <ScrollView {...scrollViewProps}>
      <Widget style={ss.container}>
        <View style={{ alignItems: "center" }}>
          <Image {...image} />
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Text style={styles.show}>
              {secure ? "Afficher" : "Masquer"}
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <CustomText style={[ss.small, {
          color: "red",
          marginBottom: 5,
          textAlign: "center",
        }]}>{error}</CustomText> : null}
        <CustomText style={[ss.medium, { textAlign: "right", marginBottom: 10}]}>Forgot Password?</CustomText>
        <CustomButton
          title="Se connecter"
          colorText={theme.colors.light}
          onPress={handleLogin}
          // disabled={!isFormValid || loading}
          style={[{ backgroundColor: isFormValid ? theme.colors.foreground : theme.colors.gray }]}
        />
        <CustomText style={[ss.small, { textAlign: "center", marginBottom: 10 }]}>Don't have an account? Sign Up</CustomText>
      </Widget>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  show: {
    color: Colors.primary,
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});