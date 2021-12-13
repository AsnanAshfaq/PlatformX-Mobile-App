//TODO:
// user background image
// user profile image
// user post's, follower's, following's
// user first name + last name , user name
// user user_name
// user bio
// user github link
// user linedin link
// edit profile button

import React, {FC, useRef, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import axios from '../../Utils/Axios';
import OrgProfile from './Organization/OrgProfile';
import StudentProfile from './Student/MyProfile';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};

const Index: FC<props> = ({navigation}) => {
  // Load profile based on current user from global state
  const [state, dispatch] = useStateValue();
  if (state.userType === 'student') {
    return <StudentProfile navigation={navigation} />;
  } else if (state.userType === 'organization') {
    return <OrgProfile />;
  }
  return null;
};

const styles = StyleSheet.create({});

export default Index;
