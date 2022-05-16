/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={LandingScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        })}
      />
      <BottomTab.Screen
        name="Notification"
        component={TabTwoScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Restaurants"
        component={TabTwoScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="inbox" size={24} color="black" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Orders"
        component={TabTwoScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Entypo name="back-in-time" size={24} color="black" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Cart"
        component={TabTwoScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" size={24} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="adduser" size={24} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
