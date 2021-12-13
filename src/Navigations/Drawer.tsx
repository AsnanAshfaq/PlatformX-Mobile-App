import React from 'react';
import {Width} from '../Constants/Size';
import CustomDrawer from '../Components/CustomDrawer';
import StudentTabScreens from './Student/Tab';
import OrganizationTabScreens from './Organization/Tab';
import StudentProfileScreens from './Student/Profile';
import OrganizationProfileScreens from './Organization/Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useStateValue} from '../Store/StateProvider';

const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  const [state, dispatch] = useStateValue();
  const {theme} = state;
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      openByDefault={false}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: theme.DRAWER_BACKGROUND_COLOR,
        width: Width * 0.65,
        // borderBottomRightRadius: 30
        // borderTopRightRadius: 30,
        borderColor: theme.DRAWER_BACKGROUND_COLOR,
      }}
      // overlayColor={'grey'}
      drawerType={'slide'}>
      {state.userType === 'student' ? (
        <>
          <Drawer.Screen name="Tabs" component={StudentTabScreens} />
          <Drawer.Screen
            name="Student_Profile_Home"
            component={StudentProfileScreens}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Tabs" component={OrganizationTabScreens} />
          <Drawer.Screen
            name="Organization_Profile_Home"
            component={OrganizationProfileScreens}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerScreens;
