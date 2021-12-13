//Sreens
// view

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FYPTabs from './Tabs/FYPTab';
import ViewSubmission from '../../Screens/Organization/FYP/ViewSubmission';
import ViewFYP from '../../Screens/Organization/FYP/View';
import CreateEditFYP from '../../Screens/Organization/FYP/CreateEdit/Index';
const FYPScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'FYPTab'}>
      <Stack.Screen name={'FYPTab'} component={FYPTabs} />
      <Stack.Screen name="View_FYP" component={ViewFYP} />
      <Stack.Screen name="View_Submission" component={ViewSubmission} />
      <Stack.Screen name="Create_Edit_FYP" component={CreateEditFYP} />
    </Stack.Navigator>
  );
};

export default FYPScreens;
