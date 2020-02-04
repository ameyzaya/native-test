import React from 'react';
import AppNavigator from './navigation/AppNavigator.js';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

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
