import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {IconButton, Avatar} from 'react-native-paper';

import IssueForm from '../screens/IssueForm';
import ListIssue from '../screens/ListIssue';
import DetailIssue from '../screens/DetailIssue';

export default createMaterialBottomTabNavigator(
  {
    Form: {
      screen: IssueForm,
      // navigationOptions: {
      //   tabBarIcon: () => <IconButton icon="details" color="white" size={17} />,
      // },
    },
    List: {
      screen: ListIssue,
      // navigationOptions: {
      //   tabBarIcon: () => <IconButton icon="details" color="white" size={17} />,
      // },
    },
    Detail: {
      screen: DetailIssue,
      // navigationOptions: {
      //   tabBarIcon: () => <IconButton icon="details" color="white" size={17} />,
      // },
    },
  },
  {
    initialRouteName: 'Form',
    activeColor: '#42f44b',
    inactiveColor: 'gray',
    barStyle: {paddingTop: 0},
    // style: {padding: 7},
    // shifting: true,

    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        let size = 20;
        let style = {paddingBottom: 0};
        if (routeName === 'Form') {
          iconName = `equal-box`;
        } else if (routeName === 'List') {
          iconName = `format-align-justify`;
        } else if (routeName === 'Detail') {
          iconName = `details`;
        }
        if (focused) {
          size = 40;
          style['paddingBottom'] = 15;
        }
        return <Avatar.Icon icon={iconName} size={size} style={style} />;
      },
    }),
  },
);
