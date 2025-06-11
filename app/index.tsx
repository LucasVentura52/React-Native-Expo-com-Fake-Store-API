import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (email === "admin@admin" && password === "123456") {
      setErrorMessage("");
      router.replace("/products");
    } else {
      setErrorMessage("Email ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.top}>
          <View style={styles.iconWrapper}>
            <Icon name="user" size={64} color="#fff" />
          </View>
          <Text style={styles.slogan}>Seu controle, sua gestão.</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

          <View style={styles.inputWrapper}>
            <Icon
              name="mail"
              size={18}
              color="#9ca3af"
              style={styles.iconLeft}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon
              name="lock"
              size={18}
              color="#9ca3af"
              style={styles.iconLeft}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity>
            <Text style={styles.forgot}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfdbfe",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 6,
  },
  top: {
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 100,
    padding: 16,
    marginBottom: 15,
  },
  slogan: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  bottom: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  iconLeft: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  forgot: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: "#2563eb",
    marginBottom: 20,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});