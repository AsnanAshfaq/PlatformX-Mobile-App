import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Create from '../../Screens/Organization/Create';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hackathon from '../../Screens/Organization/Hackathon';
import Workshop from '../../Screens/Organization/Workshop';
import FYP from '../../Screens/Organization/FYP';
import Internship from '../../Screens/Organization/Internship';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  const [state, dispatch] = useStateValue();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = focused ? Width * 0.063 : Width * 0.06;
          if (route.name === 'Hackathons') {
            iconName = focused ? 'code-slash' : 'code-sharp';
          } else if (route.name === 'Workshops') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'plussquare' : 'plussquareo';
          } else if (route.name === "FYP's") {
            iconName = focused ? 'ios-bulb-sharp' : 'ios-bulb-outline';
          } else if (route.name === 'Internships') {
            iconName = focused
              ? 'card-account-details'
              : 'card-account-details-outline';
          }
          if (route.name === 'Internships') {
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={ICON_SIZE}
                color={color}
              />
            );
          }
          if (route.name === 'Create') {
            return <AntDesign name={iconName} size={ICON_SIZE} color={color} />;
          }
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

        // activeBackgroundColor: state.theme.CARD_BACKGROUND_COLOR,
        // tabStyle: {
        //   borderTopWidth: 1,
        //   borderRadius: 10,
        //   marginVertical: 3,
        //   marginHorizontal: 6,
        //   borderColor: 'transparent',
        // },
        allowFontScaling: true,
        keyboardHidesTabBar: true,
        // activeBackgroundColor: darkColors.LIGHT_BACKGROUND,
        style: {
          backgroundColor: state.theme.HEADER_NAV_BAR_BACKGROUND_COLOR,
          borderTopColor: 'transparent',
          paddingVertical: 2,
          // position: 'absolute',
        },
      }}>
      <Tab.Screen name="Hackathons" component={Hackathon} />
      <Tab.Screen name="Workshops" component={Workshop} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="FYP's" component={FYP} />
      <Tab.Screen name="Internships" component={Internship} />
    </Tab.Navigator>
  );
};

export default TabScreens;
