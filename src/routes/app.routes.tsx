import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

import { ModalLogOut } from '../components';
import { Home, SignIn } from '../presentation/pages';
import LogOut from '../presentation/pages/LogOut';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { elevation: 0, shadowOpacity: 0, height: 64 },
        tabStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          height: 20,
          width: 20,
        },
        labelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
          marginTop: 9,
        },
        inactiveTintColor: '#9FA5C0',
        activeTintColor: '#1FCC79',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name="home"
                size={20}
                color={focused ? '#1FCC79' : color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarLabel: 'Adicionar',
          tabBarIcon: () => {
            return (
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 32,
                  backgroundColor: '#1FCC79',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  top: -17,
                }}
              >
                <Feather name="plus" size={24} color="#fff" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="LogOut"
        component={LogOut}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name="log-out"
                size={20}
                color={focused ? '#1FCC79' : color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;