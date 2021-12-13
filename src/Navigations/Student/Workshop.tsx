//Sreens
// view
// edit/ create
// details screen (submissions screen and result screen)

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewWorkshop from '../../Screens/Student/Workshop/View';
import Payment from '../../Screens/Subscription/Student/WorkshopPayment';
const HackathonScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'View_Workshop'}>
      <Stack.Screen name="View_Workshop" component={ViewWorkshop} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default HackathonScreens;

const styles = StyleSheet.create({});
