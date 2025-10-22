import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

import Home from "../pages/Home";
import Register from "../pages/Register";
import ToDoList from "../pages/ToDoList";

const Tab = createBottomTabNavigator();

const LogoTitle = () => (
    <Image
        source={require("../assets/logo.png")}
        style={{ width: 120, height: "100%", resizeMode: "contain" }}
    />
);

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#FFF",
                    height: 60,
                    padding: 5,
                },
                tabBarActiveTintColor: "#73AF01",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginBottom: 5,
                    fontFamily: "OpenSans",
                    textAlign: "center",
                },
                headerTitle: () => <LogoTitle />,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#F8F9FA",
                },
            }}
        >
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Registros"
                component={Register}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="edit" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tarefas"
                component={ToDoList}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="list" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}