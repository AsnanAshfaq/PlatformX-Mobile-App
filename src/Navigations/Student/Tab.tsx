import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hackathon from '../../Screens/Student/Hackathon';
import Workshop from '../../Screens/Student/Workshop';
import Projects from '../../Screens/Student/Project';
import FYP from '../../Screens/Student/FYP';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Sizes, Width} from '../../Constants/Size';
import Post from '../../Screens/Student/Post';
import {useStateValue} from '../../Store/StateProvider';
import Internship from '../../Screens/Student/Internship';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  const [state, dispatch] = useStateValue();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = focused ? Width * 0.063 : Width * 0.06;

          if (route.name === 'Post') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Hackathons') {
            iconName = focused ? 'code-slash' : 'code-sharp';
          } else if (route.name === 'Workshops') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === "F.Y.P's") {
            iconName = focused ? 'ios-bulb-sharp' : 'ios-bulb-outline';
          } else if (route.name === 'Internships') {
            iconName = focused
              ? 'card-account-details'
              : 'card-account-details-outline';
          }
          // You can return any component that you like here!
          if (route.name === 'Internships') {
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={ICON_SIZE}
                color={color}
              />
            );
          }
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
      }}>
      <Tab.Screen
        name="Post"
        component={Post}
        options={{tabBarLabel: 'Home'}}
        // options={{
        //   tabBarBadge: 1,
        //   tabBarBadgeStyle: {
        //     backgroundColor: darkColors.BADGE_COLOR,
        //   },
        // }}
      />
      <Tab.Screen name="Hackathons" component={Hackathon} />
      <Tab.Screen name="Workshops" component={Workshop} />
      <Tab.Screen name="F.Y.P's" component={FYP} />
      <Tab.Screen name="Internships" component={Internship} />
    </Tab.Navigator>
  );
};

export default TabScreens;
