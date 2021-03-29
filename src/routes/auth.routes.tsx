import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from '../presentation/pages/Home';
import { SignIn, SignUp } from '../presentation/pages/index';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="Home" component={Home} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
