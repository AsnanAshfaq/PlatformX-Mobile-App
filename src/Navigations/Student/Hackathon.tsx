//Sreens
// view
// edit/ create
// details screen (submissions screen and result screen)

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewHackathon from '../../Screens/Student/Hackathon/View';
import RegisterHackathon from '../../Screens/Student/Hackathon/Register';
import HackathonTab from './Tabs/HackathonTabs';
const HackathonScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'View_Hackathon'}>
      <Stack.Screen name="View_Hackathon" component={ViewHackathon} />
      <Stack.Screen name="Register_Hackathon" component={RegisterHackathon} />
      <Stack.Screen name="HackathonTab" component={HackathonTab} />
    </Stack.Navigator>
  );
};

export default HackathonScreens;

const styles = StyleSheet.create({});
