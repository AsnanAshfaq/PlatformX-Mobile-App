/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { StateProvider } from './src/Store/StateProvider';
import { reducer, initialState } from './src/Store/Reducer';

const GlobalState = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);
AppRegistry.registerComponent(appName, () => GlobalState);