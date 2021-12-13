import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Internship from '../../Screens/Organization/Internship';
import InternshipTab from './Tabs/InternshipTab';
import Meeting from '../../Screens/Organization/Internship/ScheduleMeetings';
import CreateEditInternship from '../../Screens/Organization/Internship/CreateEdit';
const InternshipScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'InternshipTab'}>
      <Stack.Screen name={'InternshipTab'} component={InternshipTab} />
      <Stack.Screen
        name={'Create_Edit_Internship'}
        component={CreateEditInternship}
      />
      <Stack.Screen name="Schedule_Meeting" component={Meeting} />
    </Stack.Navigator>
  );
};

export default InternshipScreens;

const styles = StyleSheet.create({});
