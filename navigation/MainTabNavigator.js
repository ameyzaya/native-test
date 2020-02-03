import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import OrganisationView from '../screens/fable/OrganisationView';
import GroupView from '../screens/fable/GroupView';
import StudentView from '../screens/fable/StudentView';
import StudentSelect from '../screens/selection/StudentSelect';
import PassageSelect from '../screens/selection/PassageSelect';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const MainTabNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Issue: BottomTabNavigator,
    Organisations: OrganisationView,
    Groups: GroupView,
    Students: StudentView,
    StudentSelect: StudentSelect,
    PassageSelect: PassageSelect,
  },
  {
    initialRouteName: 'Login',
  },
);

export default MainTabNavigator;
