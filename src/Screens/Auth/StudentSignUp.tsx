/* eslint-disable dot-notation */
//FIELDS :TODO:
// first name
// last name
// user name
// email (FIXME: confirmation of email)
// password
// confirm password
// phone number
// date of birth  (modal)

// Check for terms and condition

import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import Loading from '../../Components/Loading';
import {Height, Sizes, Width} from '../../Constants/Size';
import FormHandlers from '../../Utils/FormHandler';
import axios from '../../Utils/Axios';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};

const SignUp: FC<props> = ({navigation}) => {
  // get some handlers
  const {
    isEmailValid,
    isEmpty,
    isSame,
    checkLength,
    isOnylAlphabets,
  } = FormHandlers();

  const [Registration, setRegistration] = useState({
    first_name: {value: '', error: ''},
    last_name: {value: '', error: ''},
    username: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirm_password: {value: '', error: ''},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleSignUp = async () => {
    let x = Registration;
    let isAllInputsValid = true;

    // set the loading to true
    setIsLoading(true);

    const customChecks = (
      Key: string,
      emptyError: string,
      minError: string,
      maxError: string,
      minValue: number,
      maxValue: number,
    ) => {
      const value = Registration[Key]['value'].trim();
      let y = Registration;
      if (isEmpty(value)) {
        y[Key]['error'] = emptyError;
      } else {
        // if first name and last name contains values other than alphabets
        // then raise error
        if (Key === 'first_name' || Key === 'last_name') {
          if (!isOnylAlphabets(value)) {
            y[Key]['error'] = `${
              Key === 'first_name' ? 'First' : 'Last'
            } Name is invalid`;
          }
        }
        // if password contains values other than alphabets
        // then also raise error
        if (Key === 'password') {
          if (!isOnylAlphabets(value)) {
            y[Key]['error'] = 'Password cannot contain special characters';
          }
        }
        const MinMax = checkLength(value, minValue, maxValue);
        if (MinMax === 'min') {
          y[Key]['error'] = minError;
        } else if (MinMax === 'max') {
          y[Key]['error'] = maxError;
        }
      }
      const error = y[Key]['error'];
      if (error !== '') {
        Registration[Key]['error'] = error;
        Registration[Key]['value'] = value;
        setRegistration(props => {
          return {
            ...Registration,
          };
        });
        // make the input validation variable false
        isAllInputsValid = false;
      }
    };

    // check for first name
    customChecks(
      'first_name',
      'First Name cannot be Empty',
      'First Name should be atleast 5 characters.',
      'First Name should be less than 14 characters.',
      5,
      14,
    );

    // check for last name
    customChecks(
      'last_name',
      'Last Name cannot be Empty',
      'Last Name should be atleast 5 characters.',
      'Last Name should be less than 14 characters.',
      5,
      14,
    );

    // check for user name
    customChecks(
      'username',
      'User Name cannot be Empty',
      'User Name should be atleast 5 characters.',
      'User Name should be less than 14 characters.',
      5,
      14,
    );

    // check's for email
    if (isEmpty(Registration.email.value.trim())) {
      x['email']['error'] = 'Email cannnot be Empty';
    } else {
      if (!isEmailValid(Registration.email.value.trim())) {
        x['email']['error'] = 'Please enter a valid email address';
      }
    }
    if (Registration['email']['error'] !== '') {
      setRegistration(props => {
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
    customChecks(
      'password',
      'Password cannot be empty',
      'Password should be atleast 8 characters.',
      'Password should be less than 14 characters.',
      8,
      14,
    );

    // check's for confirm password
    if (isEmpty(Registration.confirm_password.value.trim())) {
      x['confirm_password']['error'] = 'Confirm Password cannnot be Empty';
    } else {
      if (
        !isSame(
          Registration.password.value.trim(),
          Registration.confirm_password.value.trim(),
        )
      ) {
        x['confirm_password']['error'] = 'Passwords do not match';
      }
    }
    if (Registration['confirm_password']['error'] !== '') {
      setRegistration(props => {
        return {
          ...props,
          confirm_password: {
            value: props.confirm_password.value,
            error: props.confirm_password.error,
          },
        };
      });
      // make the input validation variable false
      isAllInputsValid = false;
    }

    // check if all inputs are valid or not
    if (isAllInputsValid) {
      try {
        const signUpResponse = await axios.post('/user/student/signup/', {
          first_name: Registration.first_name.value.trim(),
          last_name: Registration.last_name.value.trim(),
          username: Registration.username.value.toLowerCase().trim(),
          email: Registration.email.value.trim(),
          password: Registration.password.value.trim(),
        });
        if (signUpResponse.status === 201) {
          const userData = {
            firstName: Registration.first_name.value.trim(),
            lastName: Registration.last_name.value.trim(),
            userName: Registration.username.value.toLowerCase().trim(),
            email: Registration.email.value.trim(),
            profilePic: '',
          };
          dispatch({type: 'SET_USER', payload: userData});
          dispatch({type: 'SET_USER_TYPE', payload: 'student'});
          dispatch({type: 'SET_SIGN_IN', payload: true});
          // account has been created
          ToastAndroid.show(signUpResponse.data.success, 1500);
        } else {
          ToastAndroid.show(signUpResponse.data.error, 1500);
        }
        setIsLoading(false);
      } catch (error: any) {
        if (error.response.data.email_error) {
          // set email error
          setRegistration(props => {
            return {
              ...props,
              email: {
                value: props.email.value,
                error: error.response.data.email_error,
              },
            };
          });
        } else if (error.response.data.user_name) {
          // set email error
          setRegistration(props => {
            return {
              ...props,
              username: {
                value: props.username.value,
                error: error.response.data.user_name,
              },
            };
          });
        }
        // else if there is any other error
        else if (error.response.data.error) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        // set the loading to false
        setIsLoading(false);
        // throw error;
        return Promise.reject(error);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={20}
      style={[
        styles.parent,
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <>
          {/* platformX logo  */}
          <View style={styles.logoContainer}>
            <Text style={[styles.bracket, {color: state.theme.TEXT_COLOR}]}>
              {'<'}
            </Text>
            <Text style={[styles.logo, {color: state.theme.TEXT_COLOR}]}>
              PlatformX
            </Text>
            <Text style={[styles.bracket, {color: state.theme.TEXT_COLOR}]}>
              {'/>'}
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            {/* first name field  */}
            <CustomTextField
              placeholder={'First Name'}
              defaultValue={Registration.first_name.value}
              onChangeText={text => {
                setRegistration(props => {
                  return {
                    ...props,
                    first_name: {
                      value: text,
                      error: '',
                    },
                  };
                });
              }}
              textContentType={'name'}
              keyboardType={'default'}
              autoFocus
              error={Registration.first_name.error}
            />
            {/* last name field  */}
            <CustomTextField
              placeholder={'Last Name'}
              defaultValue={Registration.last_name.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    last_name: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'name'}
              keyboardType={'default'}
              error={Registration.last_name.error}
            />
            {/* username field  */}
            <CustomTextField
              placeholder={'User Name'}
              defaultValue={Registration.username.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    username: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'username'}
              keyboardType={'default'}
              error={Registration.username.error}
            />
            <CustomTextField
              placeholder={'Email'}
              defaultValue={Registration.email.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    email: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
              error={Registration.email.error}
            />

            {/* password field  */}
            <CustomTextField
              placeholder={'Password'}
              defaultValue={Registration.password.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    password: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'password'}
              keyboardType={'default'}
              rightIcon
              secureTextEntry={true}
              error={Registration.password.error}
            />

            {/* confirm password  */}
            <CustomTextField
              placeholder={'Confirm Password '}
              defaultValue={Registration.confirm_password.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    confirm_password: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'password'}
              keyboardType={'default'}
              rightIcon
              secureTextEntry={true}
              error={Registration.confirm_password.error}
            />
          </View>
          {/* submit button container  */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {backgroundColor: state.theme.SHADOW_COLOR},
              ]}
              onPress={handleSignUp}>
              {isLoading ? (
                <Loading
                  size={'small'}
                  color={state.theme.SCREEN_BACKGROUND_COLOR}
                />
              ) : (
                <Text
                  style={[
                    styles.submitButtonText,
                    {color: state.theme.TEXT_COLOR},
                  ]}>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
            {/* sign up container  */}
            <View style={styles.signInContainer}>
              <Text
                style={[styles.signInText, {color: state.theme.TEXT_COLOR}]}>
                Don't have an account?
                <Text
                  style={[styles.signIn, {color: state.theme.GREEN_COLOR}]}
                  onPress={() => navigation.navigate('SignIn')}>
                  {' '}
                  Sign In
                </Text>
                {'  '}
                Now
              </Text>
            </View>
          </View>
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Height * 0.04,
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
    marginVertical: Height * 0.04,
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
  signInContainer: {
    marginVertical: 15,
  },
  signInText: {
    fontSize: Sizes.normal * 0.9,
    paddingVertical: 2,
  },
  signIn: {
    fontSize: Sizes.normal,
    fontWeight: 'bold',
  },
});
