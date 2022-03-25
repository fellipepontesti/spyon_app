import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/config/routes';
import { AuthProvider } from './src/context/auth';
import Register from './src/pages/Register';

export default class App extends Component{
  render() {
    return (
      <AuthProvider>
        <Router/>
      </AuthProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
