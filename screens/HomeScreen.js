import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  link: {
    marginTop: 50,
    width: '40%',
    alignSelf: 'center',
  },
});

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Button
          mode="contained"
          style={styles.link}
          onPress={() => this.props.navigation.navigate('Issue')}>
          Issue App
        </Button>
        <Button
          mode="contained"
          style={styles.link}
          onPress={() => this.props.navigation.navigate('Organisations')}>
          Fable App
        </Button>
        <Button
          mode="contained"
          style={styles.link}
          onPress={() => this.props.navigation.navigate('StudentSelect')}>
          Dropdowns
        </Button>
        <Button
          mode="contained"
          style={styles.link}
          onPress={() => this.props.navigation.navigate('Uploader')}>
          File Upload
        </Button>
      </View>
    );
  }
}
