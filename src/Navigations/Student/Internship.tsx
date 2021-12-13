//Sreens
// view
// edit/ create
// details screen (submissions screen and result screen)

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import View_Internship from '../../Screens/Student/Internship/View';
import ApplyNow from '../../Screens/Student/Internship/ApplyNow';
const InternshipScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'View_Internship'}>
      <Stack.Screen name="View_Internship" component={View_Internship} />
      <Stack.Screen name="Apply_Now" component={ApplyNow} />
    </Stack.Navigator>
  );
};

export default InternshipScreens;

const styles = StyleSheet.create({});
