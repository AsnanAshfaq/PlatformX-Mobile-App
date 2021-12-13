import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../../Screens/Chat/ChatList';
import Chat from '../../Screens/Chat/Chat';
import Bot from '../../Screens/Chat/Bot';
const Stack = createStackNavigator();

const ChatScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'ChatList'}>
      <Stack.Screen name={'ChatList'} component={ChatList} />
      <Stack.Screen name={'ChatScreen'} component={Chat} />
      <Stack.Screen name={'BotScreen'} component={Bot} />
    </Stack.Navigator>
  );
};

export default ChatScreens;
