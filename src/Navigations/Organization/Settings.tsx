import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../Screens/Organization/Settings';
import Theme from '../../Screens/Theme';
const Stack = createStackNavigator();

const SettingScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'Index'}>
      <Stack.Screen name={'Index'} component={Index} />
      <Stack.Screen name={'Theme'} component={Theme} />
    </Stack.Navigator>
  );
};

export default SettingScreens;
