import { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { AppContext } from "../contexts/AppContext";

const { APP_PIN } = Constants.expoConfig.extra;

export default function Pin() {
  const [pin, setPin] = useState("");
  const { setIsAuthenticated } = useContext(AppContext);

  const handleSubmit = () => {
    if (pin === APP_PIN) {
      setIsAuthenticated(true);
    } else {
      Alert.alert("PIN incorreto", "Tente novamente.");
      setPin("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o PIN:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        value={pin}
        onChangeText={setPin}
        placeholder="****"
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 8,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#D2B48C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
