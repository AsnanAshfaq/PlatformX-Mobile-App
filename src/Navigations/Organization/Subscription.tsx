import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Plan from '../../Screens/Subscription/Organization/Hackathon/Plan';
import Payment from '../../Screens/Subscription/Organization/Hackathon/Payment';
const Stack = createStackNavigator();

const SubscriptionScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'Plan'}>
      <Stack.Screen name={'Plan'} component={Plan} />
      <Stack.Screen name={'Payment'} component={Payment} />
    </Stack.Navigator>
  );
};

export default SubscriptionScreens;
