/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './navigation/AppNavigator.js';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

class App extends React.Component {
  render() {
    return (
      <PaperProvider style={theme}>
        <AppNavigator />
      </PaperProvider>
    );
  }
}

export default App;
