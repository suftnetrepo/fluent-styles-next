import React from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { config } from "~/pages/config";
import { StackParamList } from "../navigation/StackParamList";
import Home from "../pages/home";

export type RootStackScreenProps<T extends keyof StackParamList> =
    StackScreenProps<StackParamList, T>
const Stack = createStackNavigator<StackParamList>();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={Home} />
                {config.map(({ Page, path }) => (
                    <Stack.Screen key={path} name={path} component={Page} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>);
};

export default Navigator;