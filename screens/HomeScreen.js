import React from 'react';
import {Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{marginTop: 50}}
          onPress={() => this.props.navigation.navigate('Issue')}>
          Issue App
        </Text>
        <Text
          style={{marginTop: 50}}
          onPress={() => this.props.navigation.navigate('Organisations')}>
          Fable App
        </Text>
        <Text
          style={{marginTop: 50}}
          onPress={() => this.props.navigation.navigate('StudentSelect')}>
          Dropdowns
        </Text>
      </View>
    );
  }
}
