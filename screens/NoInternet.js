import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    alignSelf: 'center',
  },
});

export default class NoInternet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection!!</Text>
      </View>
    );
  }
}
