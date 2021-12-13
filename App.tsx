//TODO:
// when user opens the app
// get "access" token from local storage
// if token != ''
// make api call to validate token
// if token is valid, go to main screen
// else go to auth screens
import Firebase from '@react-native-firebase/app';
import React, {useEffect, useRef, useState} from 'react';
import Navigation from './src/Navigations/index';
import {useStateValue} from './src/Store/StateProvider';
import axios from './src/Utils/Axios';
import {MenuProvider} from 'react-native-popup-menu';
import Splash from './src/Components/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from './src/Utils/Notifications';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import DeviceInfo from 'react-native-device-info';
const App = () => {
  const [Loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  const {theme} = state;

  useEffect(() => {
    // trigger remote notifications
    Notifications();
    const getUserType = async () => {
      // get token from local storage
      const accessToken = await AsyncStorage.getItem('access');
      if (accessToken !== null && accessToken !== '') {
        // make api call
        try {
          const userResponse = await axios.get('/user/');
          if (userResponse.status === 200) {
            // get result and store in context state
            dispatch({type: 'SET_SIGN_IN', payload: true});
            if (userResponse.data.student) {
              // store student related data
              const userData = {
                firstName: userResponse.data.first_name,
                lastName: userResponse.data.last_name,
                email: userResponse.data.email,
                userName: userResponse.data.username,
                profilePic: userResponse.data.user_profile_image.path,
              };
              dispatch({type: 'SET_USER_TYPE', payload: 'student'});
              dispatch({type: 'SET_USER', payload: userData});
            } else if (userResponse.data.organization) {
              const userData = {
                name: userResponse.data.organization.name,
                regNo: userResponse.data.organization.reg_no,
                email: userResponse.data.email,
                location: userResponse.data.organization.location,
                profilePic:
                  userResponse.data.user_profile_image !== undefined
                    ? userResponse.data.user_profile_image.path
                    : '',
              };
              dispatch({type: 'SET_USER', payload: userData});
              dispatch({type: 'SET_USER_TYPE', payload: 'organization'});
            }
          }
          setLoading(false);
        } catch (error) {
          // set sign in state
          console.log('Error is ', error);
          dispatch({type: 'SET_USER_TYPE', payload: null});
          dispatch({type: 'SET_SIGN_IN', payload: false});
          setLoading(false);
          return Promise.reject(error);
        }
      } else {
        // set sign in state
        dispatch({type: 'SET_USER_TYPE', payload: null});
        dispatch({type: 'SET_SIGN_IN', payload: false});
        setLoading(false);
      }
    };

    const getDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      console.log('Device id is ', id);
    };

    getDeviceId();
    getUserType();
  }, [dispatch]);

  if (!Loading) {
    return (
      <MenuProvider
        customStyles={{
          menuProviderWrapper: {
            backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
          },
          // backdrop: {
          //   opacity: 0.01,
          //   backgroundColor: 'grey',
          // },
        }}>
        <Navigation />
      </MenuProvider>
    );
  }
  return <Splash />;
};

export default App;
