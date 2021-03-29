import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';

import { useAuth } from '../hooks/auth';
import { Home } from '../presentation/pages';
import LogOut from '../presentation/pages/LogOut';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const { signOut } = useAuth();
  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { elevation: 0, shadowOpacity: 0, height: 64 },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'home',
          tabBarIcon: () => {
            return <Feather name="home" size={24} color="red" />;
          },
        }}
      />

      <Tab.Screen
        name="LogOut"
        component={LogOut}
        options={{
          tabBarLabel: 'logout',
          tabBarIcon: () => {
            return <Feather name="log-out" size={24} color="green" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
