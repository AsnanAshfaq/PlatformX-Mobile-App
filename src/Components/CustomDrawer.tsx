import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../../src/Store/StateProvider';
import {PROFILE_IMAGE} from '../Constants/sample';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import SignOutModal from '../Modals/SignOutModal';

import Divider from '../Components/Divider';
import CustomButton from './CustomButton';
type Props = {
  label: string;
  icon_name: string;
  onPress: () => void;
};

const CustomDrawerItem: FC<Props> = ({label, icon_name, onPress}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <DrawerItem
      label={({focused, color}) => (
        <Text style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.9}}>
          {label}
        </Text>
      )}
      icon={({focused, color, size}) =>
        label === 'Payments' ? (
          <MaterialIcons name={icon_name} size={20} color={theme.GREEN_COLOR} />
        ) : label === 'Doxi' ? (
          <FontAwesome5 name={icon_name} size={20} color={theme.GREEN_COLOR} />
        ) : label === 'Subscriptions' ? (
          <MaterialIcons name={icon_name} size={20} color={theme.GREEN_COLOR} />
        ) : (
          <Ionicons name={icon_name} size={20} color={theme.GREEN_COLOR} />
        )
      }
      onPress={() => onPress()}
    />
  );
};

type props = {
  navigation?: any;
};
const StudentDrawer: FC<props> = ({navigation}) => {
  const [state, dispatch] = useStateValue();
  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const [signOutModal, setSignOutModal] = useState(false);

  const StudentDrawerItems = [
    {
      id: 1,
      label: 'Read Articles',
      icon_name: 'book',
      onPress: () => navigation.navigate('Articles'),
    },
    {
      id: 2,
      label: 'Payments',
      icon_name: 'payment',
      onPress: () => navigation.navigate('Payments'),
    },
    {
      id: 4,
      label: 'Doxi',
      icon_name: 'robot',
      onPress: () =>
        navigation.navigate('Chat', {
          screen: 'BotScreen',
        }),
    },
    {
      id: 5,
      label: 'Settings',
      icon_name: 'ios-settings-sharp',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 6,
      label: "FAQ's",
      icon_name: 'md-chatbox-sharp',
      onPress: () =>
        navigation.navigate('FAQS', {
          source: 'student',
        }),
    },
    {
      id: 7,
      label: 'Contact Us',
      icon_name: 'call-sharp',
      onPress: () => navigation.navigate('ContactUs'),
    },
    {
      id: 8,
      label: 'Sign Out',
      icon_name: 'md-log-out-outline',
      onPress: () => {
        navigation.closeDrawer();
        setSignOutModal(true);
      },
    },
  ];

  useEffect(() => {
    return () => {
      setLoadProfileImage(false);
      setSignOutModal(false);
    };
  }, []);
  return (
    <>
      {/* sign out modal  */}
      <SignOutModal
        isShow={signOutModal}
        toggleModal={() => setSignOutModal(false)}
      />
      {/* profile section  */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: LoadProfileImage
              ? PROFILE_IMAGE
              : state.user.profilePic !== ''
              ? BASE_URL + state.user.profilePic
              : PROFILE_IMAGE,
          }}
          onLoadEnd={() => setLoadProfileImage(false)}
          onError={() => {
            setLoadProfileImage(false);
            ToastAndroid.show("Couldn't load profile image", 1500);
          }}
          style={styles.profileImage}
        />
        <View style={[styles.center, {marginVertical: 10}]}>
          <Text style={[styles.fullName, {color: state.theme.TEXT_COLOR}]}>
            {state.user.firstName + ' ' + state.user.lastName}
          </Text>
          <Text style={[styles.userName, {color: state.theme.DIM_TEXT_COLOR}]}>
            @{state.user.userName}
          </Text>
        </View>

        <CustomButton
          text={'View Profile'}
          onPress={() => navigation.navigate('Student_Profile')}
          width={Width * 0.28}
          height={Width * 0.1}
          textSize={Sizes.normal * 0.8}
        />
      </View>
      {/* drawer items list  */}
      {StudentDrawerItems.map(item => (
        <CustomDrawerItem
          key={item.id}
          icon_name={item.icon_name}
          label={item.label}
          onPress={item.onPress}
        />
      ))}
    </>
  );
};

const OrganizationDrawer: FC<props> = ({navigation}) => {
  const [state, dispatch] = useStateValue();
  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const [signOutModal, setSignOutModal] = useState(false);

  const OrganizationDrawerItems = [
    {
      id: 1,
      label: 'Subscriptions',
      icon_name: 'payments',
      onPress: () => navigation.navigate('MySubscriptions'),
    },
    {
      id: 2,
      label: 'Settings',
      icon_name: 'ios-settings-sharp',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 3,
      label: "FAQ's",
      icon_name: 'md-chatbox-sharp',
      onPress: () =>
        navigation.navigate('FAQS', {
          source: 'organization',
        }),
    },
    {
      id: 4,
      label: 'Contact Us',
      icon_name: 'call-sharp',
      onPress: () => navigation.navigate('ContactUs'),
    },
    {
      id: 5,
      label: 'Sign Out',
      icon_name: 'md-log-out-outline',
      onPress: () => {
        navigation.closeDrawer();
        setSignOutModal(true);
      },
    },
  ];

  useEffect(() => {
    return () => {
      setLoadProfileImage(false);
      setSignOutModal(false);
    };
  }, []);

  return (
    <>
      {/* profile section  */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: LoadProfileImage
              ? PROFILE_IMAGE
              : state.user.profilePic !== ''
              ? BASE_URL + state.user.profilePic
              : PROFILE_IMAGE,
          }}
          onLoadEnd={() => setLoadProfileImage(false)}
          onError={() => {
            setLoadProfileImage(false);
            ToastAndroid.show("Couldn't load profile image", 1500);
          }}
          style={styles.profileImage}
        />
        <Text style={[styles.fullName, {color: state.theme.TEXT_COLOR}]}>
          {state.user.name}
        </Text>
        <Text style={[styles.location, {color: state.theme.DIM_TEXT_COLOR}]}>
          Based in {state.user.location}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // navigation.closeDrawer();
            navigation.navigate('Organization_Profile_Home');
          }}
          style={[
            styles.profileButtonContainer,
            {backgroundColor: state.theme.GREEN_COLOR},
          ]}>
          <Text
            style={[styles.profileButtonText, {color: state.theme.TEXT_COLOR}]}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
      {/* drawer items list  */}
      {OrganizationDrawerItems.map(item => (
        <CustomDrawerItem
          key={item.id}
          icon_name={item.icon_name}
          label={item.label}
          onPress={item.onPress}
        />
      ))}

      <SignOutModal
        isShow={signOutModal}
        toggleModal={() => setSignOutModal(false)}
      />
    </>
  );
};

const CustomDrawer: FC<props> = (props: any) => {
  const {navigation} = props;
  const [state, dispatch] = useStateValue();
  const {theme} = state;

  return (
    <DrawerContentScrollView
      {...props}
      style={[
        styles.parent,
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      {/* <DrawerItemList {...props} /> */}
      {/* header  */}
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, {color: state.theme.TEXT_COLOR}]}>
          PlatformX
        </Text>
        <Divider width={Width * 0.53} marginHorizontal={0} />
      </View>

      {state.userType === 'student' ? (
        <StudentDrawer navigation={navigation} />
      ) : (
        <OrganizationDrawer navigation={navigation} />
      )}

      <View style={[styles.footerContainer, styles.center]}>
        <Text style={{fontSize: Sizes.small, color: theme.DIM_TEXT_COLOR}}>
          Version 1.0.0 -<Text style={{color: theme.GREEN_COLOR}}> BETA</Text>
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  headerContainer: {
    width: Width * 0.6,
    marginHorizontal: Width * 0.02,
    padding: Width * 0.035,
  },
  headerTitle: {
    fontSize: Sizes.normal * 1.3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    height: Height * 0.09,
    width: Width * 0.18,
    borderRadius: 40,
  },
  fullName: {
    fontSize: Sizes.normal * 1.1,
  },
  userName: {
    fontSize: Sizes.normal * 0.9,
  },
  location: {
    fontSize: Sizes.normal * 0.9,
  },
  profileButtonContainer: {
    marginVertical: Width * 0.03,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 15,
  },
  profileButtonText: {
    fontSize: Sizes.normal * 0.8,
  },
  footerContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginHorizontal: Width * 0.04,
  },
  footerText: {},
});

export default CustomDrawer;
