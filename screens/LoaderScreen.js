import React from 'react';
import {Text, View, StyleSheet, AsyncStorage} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  loader: {
    alignSelf: 'center',
  },
});

export default class LoaderScreen extends React.Component {
  componentDidMount() {
    NetInfo.addEventListener(state => {
      console.log('state', state);
      if (!state.isConnected || !state.isInternetReachable) {
        let navStack = this.props.navigation.dangerouslyGetParent().state;
        let routes = navStack['routes'][1]['routes'];
        let screen = routes[routes.length - 1]['routeName'];
        console.log('capt screen', screen);
        this.checkConnectRoute(screen);
        this.props.navigation.navigate('NoInternet', {currentRoute: screen});
      } else {
        // this.removeRoute();
        this.retrieveToken();
      }
    });
  }

  retrieveToken = async () => {
    await AsyncStorage.getItem('ACCESS_TOKEN', (err, result) => {
      if (result && result !== null) {
        AsyncStorage.getItem('connect_route', (err, result) => {
          if (result && result !== null) {
            console.log('connected', result);

            this.props.navigation.navigate(result);
            this.removeRoute();
          } else this.props.navigation.navigate('Main');
        });
      } else this.props.navigation.navigate('Login');
    });
  };

  checkConnectRoute = async screen => {
    await AsyncStorage.getItem('connect_route', (err, result) => {
      if (result && result !== null) {
        console.log('present', result);
      } else this.saveRoute(screen);
    });
  };

  saveRoute = async screen => {
    console.log('saved route', screen);

    await AsyncStorage.setItem('connect_route', screen);
  };

  removeRoute = async () => {
    console.log('remove');

    await AsyncStorage.removeItem('connect_route');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} style={styles.loader} />
      </View>
    );
  }
}
