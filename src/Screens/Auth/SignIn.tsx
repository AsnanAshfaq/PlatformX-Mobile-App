/* eslint-disable dot-notation */
import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomTextField from '../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../Constants/Size';
import Loading from '../../Components/Loading';
import FormHandlers from '../../Utils/FormHandler';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStateValue} from '../../Store/StateProvider';
import Axios from '../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
// import Axios from 'react-native-axios';

type props = {
  navigation: any;
};

const SignIn: FC<props> = ({navigation}) => {
  const [signIn, setsignIn] = useState({
    email: {value: '18asnan@gmail.com', error: ''},
    password: {value: 'netsol@123', error: ''},
  });

  const [isLoading, setIsLoading] = useState(false);

  // get some handlers
  const {isEmailValid, isEmpty} = FormHandlers();
  // get context state
  const [{theme}, dispatch] = useStateValue();

  const storeTokenLocally = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      await AsyncStorage.setItem(key, '');
    }
  };

  const handleSignIn = async () => {
    // set the loading to true
    let x = signIn;
    let isAllInputsValid = true;
    setIsLoading(true);

    // check's for email
    if (isEmpty(signIn.email.value.trim())) {
      x['email']['error'] = 'Email cannnot be Empty';
    } else {
      if (!isEmailValid(signIn.email.value.trim())) {
        x['email']['error'] = 'Please enter a valid email address';
      }
    }
    if (signIn['email']['error'] !== '') {
      setsignIn(props => {
        return {
          ...props,
          email: {
            value: props.email.value,
            error: props.email.error,
          },
        };
      });
      // make the input validation variable false
      isAllInputsValid = false;
    }

    // check's for password
    if (isEmpty(signIn.password.value.trim())) {
      signIn['password']['error'] = 'Password cannot be empty';
      setsignIn(props => {
        return {
          ...signIn,
        };
      });
      // make the input validation variable false
      isAllInputsValid = false;
    }

    if (isAllInputsValid) {
      try {
        const signInResponse = await Axios.post('/user/signin/', {
          email: signIn.email.value.trim(),
          password: signIn.password.value.trim(),
        });

        if (signInResponse.status === 200) {
          if (signInResponse.data.access && signInResponse.data.refresh) {
            await storeTokenLocally('access', signInResponse.data.access);
            await storeTokenLocally('refresh', signInResponse.data.refresh);
            try {
              const userResponse = await Axios.get('/user/');
              if (userResponse.status === 200) {
                if (userResponse.data.student) {
                  dispatch({type: 'SET_USER_TYPE', payload: 'student'});
                  const userData = {
                    firstName: userResponse.data.first_name,
                    lastName: userResponse.data.last_name,
                    email: userResponse.data.email,
                    userName: userResponse.data.username,
                    profilePic: userResponse.data.user_profile_image.path,
                  };
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
                  dispatch({
                    type: 'SET_USER_TYPE',
                    payload: 'organization',
                  });
                }
                dispatch({type: 'SET_SIGN_IN', payload: true});
              } else {
                ToastAndroid.show('Error occured while signing in', 1500);
              }
              // set the loading to false
              setIsLoading(false);
            } catch (error: any) {
              ToastAndroid.show('Error occured while signing in', 1500);
              setIsLoading(false);
              return error.response;
            }
          }
        } else {
          setIsLoading(false);

          ToastAndroid.show('Error occured while signing in', 1500);
        }
      } catch (error: any) {
        if (error.response.data.email_error) {
          // set email error
          setsignIn(props => {
            return {
              ...props,
              email: {
                value: props.email.value,
                error: error.response.data.email_error,
              },
            };
          });
        } else if (error.response.data.password_error) {
          // set password error
          setsignIn(props => {
            return {
              ...props,
              password: {
                value: props.password.value,
                error: error.response.data.password_error,
              },
            };
          });
        }
        // else if there is any other error
        else if (error.response.data.error) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        setIsLoading(false);
        return error.response;
      }
    } else {
      setIsLoading(false);
    }
  };

  const forgotPassword = () => {
    // clear all the error first
    setsignIn(props => {
      return {
        email: {value: '', error: ''},
        password: {value: '', error: ''},
      };
    });
    navigation.navigate('ResetPassword');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      {/* platformX logo  */}
      <View style={[styles.logoContainer]}>
        <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>{'<'}</Text>
        <Text style={[styles.logo, {color: theme.TEXT_COLOR}]}>PlatformX</Text>
        <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>{'/>'}</Text>
      </View>
      <View style={styles.fieldContainer}>
        {/* email field  */}
        <CustomTextField
          placeholder={'Email'}
          defaultValue={signIn.email.value}
          onChangeText={text => {
            setsignIn(props => {
              return {
                ...props,
                email: {
                  value: text,
                  error: '',
                },
              };
            });
          }}
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          error={signIn.email.error}
          placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
        />

        {/* password field  */}
        <CustomTextField
          placeholder={'Password'}
          defaultValue={signIn.password.value}
          onChangeText={text => {
            setsignIn(props => {
              return {
                ...props,
                password: {
                  value: text,
                  error: '',
                },
              };
            });
          }}
          textContentType={'password'}
          keyboardType={'default'}
          error={signIn.password.error}
          rightIcon
          secureTextEntry={true}
          placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
        />
        {/* forgot password container  */}
        <View style={styles.forgotContainer}>
          <TouchableWithoutFeedback onPress={() => forgotPassword()}>
            <Text style={[styles.forgotText, {color: theme.GREEN_COLOR}]}>
              Forgot password?
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* submit button container  */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, {backgroundColor: theme.GREEN_COLOR}]}
          onPress={handleSignIn}>
          {isLoading ? (
            <Loading size={'small'} color={theme.SCREEN_BACKGROUND_COLOR} />
          ) : (
            <Text style={[styles.submitButtonText, {color: theme.TEXT_COLOR}]}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>
        {/* sign up container  */}
        <View style={styles.signUpContainer}>
          <Text style={[styles.signUpText, {color: theme.TEXT_COLOR}]}>
            Don't have an account?{' '}
            <Text
              style={[styles.signUp, {color: theme.GREEN_COLOR}]}
              onPress={() => navigation.navigate('UserType')}>
              {' '}
              Sign Up
            </Text>
            {'  '}
            Now
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bracket: {
    fontSize: Sizes.large * 2,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Regular',
  },
  logo: {
    fontSize: Sizes.large * 1.7,
    fontFamily: 'Comfortaa-SemiBold',
  },
  fieldContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotContainer: {
    // flex: 0.1,
    width: Width * 0.8,
    // flex: 0.2,
    marginVertical: 7,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  forgotText: {
    fontSize: Sizes.normal,
  },
  submitButtonContainer: {
    flex: 0.2,
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
  signUpContainer: {
    marginVertical: 15,
  },
  signUpText: {
    fontSize: Sizes.normal * 0.9,
    paddingVertical: 2,
  },
  signUp: {
    fontSize: Sizes.normal,
    fontWeight: 'bold',
  },
});
