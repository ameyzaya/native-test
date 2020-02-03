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
        tabBarIcon: () => <IconButton icon="details" color="white" size={17} />,
      },
    },
    List: {
      screen: ListIssue,
      navigationOptions: {
        tabBarIcon: () => <IconButton icon="details" color="white" size={17} />,
      },
    },
    Detail: {
      screen: DetailIssue,
      navigationOptions: {
        tabBarIcon: () => <IconButton icon="details" color="white" size={17} />,
      },
    },
  },
  {
    initialRouteName: 'List',
    activeColor: 'skyblue',
    inactiveColor: 'white',
    // barStyle: {},
    shifting: true,
  },
);
