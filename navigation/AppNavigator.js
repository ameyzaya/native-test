import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import NoInternet from '../screens/NoInternet';
import LoaderScreen from '../screens/LoaderScreen';

export default AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Loader: LoaderScreen,
      Main: MainTabNavigator,
      Login: LoginScreen,
      NoInternet: NoInternet,
    },
    {
      initialRouteName: 'Loader',
    },
  ),
);
