import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from "./Home";
import History from "./History";
import Image from "./Image";

const Tab = createBottomTabNavigator();
const Nav = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'calculator';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'cog' : 'cog';
                        }
                        else if (route.name === 'History') {
                            iconName = 'history';
                        }
                        else if (route.name === 'Image') {
                            iconName = 'heartbeat';
                        }
                        return <FontAwesome5 name={iconName} size={30} color={color} />;
                    },
                    tabBarOptions: {
                        activeTintColor: "#46A0C2",
                        inactiveTintColor: "#A6A0C2"
                    }
                })}
                
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="History" component={History} />
                <Tab.Screen name="Image" component={Image} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Nav