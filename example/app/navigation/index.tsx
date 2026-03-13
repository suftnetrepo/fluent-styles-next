import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { StackParamList } from "../navigation/StackParamList";
import Home from "../pages/home";

const Stack = createStackNavigator<StackParamList>();

const Navigator = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>);
};

export default Navigator;