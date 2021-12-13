import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../../Screens/Notification';
import {config} from '../index';

const Stack = createStackNavigator();

const NotificationScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'Notification'}>
      <Stack.Screen
        name={'Notification'}
        component={Notification}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationScreens;
