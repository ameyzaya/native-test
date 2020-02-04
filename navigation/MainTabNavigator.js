import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import OrganisationView from '../screens/fable/OrganisationView';
import GroupView from '../screens/fable/GroupView';
import StudentView from '../screens/fable/StudentView';
import StudentSelect from '../screens/selection/StudentSelect';
import PassageSelect from '../screens/selection/PassageSelect';
import Uploader from '../screens/Uploader';

// const config = Platform.select({
//   web: {headerMode: 'screen'},
//   default: {},
// });

const MainTabNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Issue: BottomTabNavigator,
    Organisations: OrganisationView,
    Groups: GroupView,
    Students: StudentView,
    StudentSelect: StudentSelect,
    PassageSelect: PassageSelect,
    Uploader: Uploader,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#6200EE',
      },
    },
  },
);

export default MainTabNavigator;
