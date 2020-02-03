import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {IconButton} from 'react-native-paper';

import IssueForm from '../screens/IssueForm';
import ListIssue from '../screens/ListIssue';
import DetailIssue from '../screens/DetailIssue';

const det = <IconButton icon="details" />;

export default createMaterialBottomTabNavigator(
  {
    Form: {
      screen: IssueForm,
      navigationOptions: {
        tabBarIcon: () => <IconButton icon="details" color="white" />,
      },
    },
    List: {
      screen: ListIssue,
      navigationOptions: {
        tabBarIcon: () => <IconButton icon="details" color="white" />,
      },
    },
    Detail: {
      screen: DetailIssue,
      navigationOptions: {
        tabBarIcon: () => <IconButton icon="details" color="white" />,
      },
    },
  },
  {
    initialRouteName: 'List',
    activeColor: 'skyblue',
    inactiveColor: 'white',
    // barStyle: {backgroundColor: 'darkblue'},
    shifting: true,
  },
);
