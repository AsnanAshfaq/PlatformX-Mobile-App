import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WorkshopTabs from './Tabs/WorkshopTab';
import CreateEditWorkshop from '../../Screens/Organization/Workshop/CreateEdit/index';
const WorkshopScreens = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'WorkshopTab'}>
      <Stack.Screen name={'WorkshopTab'} component={WorkshopTabs} />
      <Stack.Screen
        name={'Create_Edit_Workshop'}
        component={CreateEditWorkshop}
      />
    </Stack.Navigator>
  );
};

export default WorkshopScreens;

const styles = StyleSheet.create({});
