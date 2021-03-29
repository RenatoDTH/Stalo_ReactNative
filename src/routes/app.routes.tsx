import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { ModalLogOut } from '../components';
import { Home } from '../presentation/pages';
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
          width: 22,
          height: 22,
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
                size={size}
                color={focused ? '#1FCC79' : color}
              />
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
                size={size}
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
