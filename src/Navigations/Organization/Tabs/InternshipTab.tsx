import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OverView from '../../../Screens/Organization/Internship/View';
import Applicants from '../../../Screens/Organization/Internship/Applicants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';

const Tab = createBottomTabNavigator();

const TabScreens = ({route}) => {
  const [state, dispatch] = useStateValue();

  const internshipID = route.params.ID;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = focused ? Width * 0.063 : Width * 0.06;
          if (route.name === 'Overview') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Applicants') {
            iconName = focused ? 'file-text' : 'file-text-o';
          }

          if (route.name === 'Applicants') {
            return (
              <FontAwesome name={iconName} size={ICON_SIZE} color={color} />
            );
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
        initialParams={{ID: internshipID}}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Applicants"
        component={Applicants}
        initialParams={{ID: internshipID}}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};

export default TabScreens;
