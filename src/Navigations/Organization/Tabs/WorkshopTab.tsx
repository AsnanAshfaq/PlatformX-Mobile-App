import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OverView from '../../../Screens/Organization/Workshop/View';
import Participants from '../../../Screens/Organization/Workshop/Participants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';

const Tab = createBottomTabNavigator();

const TabScreens = ({route}) => {
  const [state, dispatch] = useStateValue();

  const workshopID = route.params.ID;
  console.log('Workshop id is', workshopID);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = focused ? Width * 0.063 : Width * 0.06;
          if (route.name === 'Overview') {
            iconName = focused ? 'book' : 'book-outline';
          }
          if (route.name === 'Participants') {
            iconName = focused ? 'people-sharp' : 'people-outline';
          }
          // } else if (route.name === 'Submissions') {
          //   iconName = focused ? 'file-account' : 'file-account-outline';
          // } else if (route.name === 'Result') {
          //   iconName = focused ? 'checkcircle' : 'checkcircleo';
          // }

          // if (route.name === 'Submissions') {
          //   return (
          //     <MaterialCommunityIcons
          //       name={iconName}
          //       size={ICON_SIZE}
          //       color={color}
          //     />
          //   );
          // }
          // if (route.name === 'Result') {
          //   return (
          //     <AntDesign
          //       name={iconName}
          //       size={focused ? ICON_SIZE * 0.9 : ICON_SIZE * 0.85}
          //       color={color}
          //     />
          //   );
          // }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={ICON_SIZE} color={color} />;
        },
        tabBarLabel: ({focused, color}) => (
          <>
            <Text
              style={{
                color: focused ? state.theme.NAV_BAR_ACTIVE_ICON_COLOR : color,
                fontSize: focused ? Sizes.small * 0.65 : Sizes.small * 0.63,
                marginVertical: !focused ? 2 : 0,
              }}>
              {route.name}
            </Text>
            {focused && (
              <View
                style={{
                  backgroundColor: state.theme.NAV_BAR_ACTIVE_ICON_COLOR,
                  width: 22,
                  height: 3.5,
                  marginVertical: 2.5,
                  borderWidth: 1,
                  borderRadius: 3,
                  borderColor: 'transparent',
                }}
              />
            )}
          </>
        ),
      })}
      tabBarOptions={{
        activeTintColor: state.theme.NAV_BAR_ACTIVE_ICON_COLOR,
        inactiveTintColor: state.theme.NAV_BAR_INACTIVE_ICON_COLOR,
        iconStyle: {
          // color: state.theme.TAB_BAR_ICON_COLOR,
          // fontSize: Sizes.normal * 10,
        },

        allowFontScaling: true,
        keyboardHidesTabBar: true,
        // activeBackgroundColor: darkColors.LIGHT_BACKGROUND,
        style: {
          backgroundColor: state.theme.HEADER_NAV_BAR_BACKGROUND_COLOR,
          borderTopColor: 'transparent',
          paddingVertical: 2,
          // position: 'absolute',
        },
      }}
      backBehavior="none">
      <Tab.Screen
        name="Overview"
        component={OverView}
        initialParams={{ID: workshopID}}
      />
      <Tab.Screen
        name="Participants"
        component={Participants}
        initialParams={{ID: workshopID}}
      />
    </Tab.Navigator>
  );
};

export default TabScreens;
