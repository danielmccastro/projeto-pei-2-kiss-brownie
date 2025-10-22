import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "./contexts/AppContext";
import Routes from "./routes";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </NavigationContainer>
    </AppProvider>
  );
}
