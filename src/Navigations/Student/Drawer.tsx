import React from 'react';
import {Width} from '../../Constants/Size';
import CustomDrawer from '../../Components/CustomDrawer';
import StudentTabScreens from '.././Student/Tab';
import StudentProfileScreens from '.././Student/Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useStateValue} from '../../Store/StateProvider';

const StudentDrawerScreens = () => {
  const [state, dispatch] = useStateValue();
  const {theme} = state;

  const Drawer = createDrawerNavigator();
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
      <Drawer.Screen name="Tabs" component={StudentTabScreens} />
      <Drawer.Screen name="Student_Profile" component={StudentProfileScreens} />
    </Drawer.Navigator>
  );
};

export default StudentDrawerScreens;
