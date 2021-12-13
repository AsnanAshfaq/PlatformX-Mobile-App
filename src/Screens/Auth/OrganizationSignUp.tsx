/* eslint-disable dot-notation */
//FIELDS :TODO:
// organization name
// reg number
// email address (FIXME: confirmation of email)
// password
// confirm password
// phone number (FIXME: why phone number)
// location (modal)
// incorporation date (modal)

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
import CustomTextField from '../../Components/CustomTextField2';
import Loading from '../../Components/Loading';
import {Height, Sizes, Width} from '../../Constants/Size';
import FormHandlers from '../../Utils/FormHandler';
import axios from '../../Utils/Axios';
import {useStateValue} from '../../Store/StateProvider';
import CustomButton from '../../Components/CustomButton';
import {Calendar} from '../../Components/Icons';
import DateTimePicker from '../../Components/DateTimePicker';
import HelpText from '../../Components/HelpText';
import LocationModal from '../../Modals/Locations';
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
    name: {value: '', error: ''},
    reg_no: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirm_password: {value: '', error: ''},
    location: {value: '', error: ''},
    incorpDate: {value: new Date(), error: ''},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useStateValue();
  const [modal, setmodal] = useState({
    date: false,
    location: false,
  });
  const {theme} = state;

  const handleSignUp = async () => {
    // creating reference of registaions
    let y = Registration;
    let isAllInputsValid = true;

    // set the loading to true
    setIsLoading(true);

    // check for organization name
    if (isEmpty(Registration.name.value.trim())) {
      y['name']['error'] = 'Organization name cannot be empty';
      isAllInputsValid = false;
    }

    // check for organization registraion number
    if (isEmpty(Registration.reg_no.value.trim())) {
      y['reg_no']['error'] = 'Registration Number cannot be empty';
      isAllInputsValid = false;
    }

    // check for incorporation date
    if (
      Registration.incorpDate.value.toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      isAllInputsValid = false;
      y['error'] = 'Last date cannot be today.';
    } else if (Registration.incorpDate.value > new Date()) {
      isAllInputsValid = false;
      y['error'] = 'Invalid date.';
    }

    // check's for email
    if (isEmpty(Registration.email.value.trim())) {
      y['email']['error'] = 'Email cannnot be Empty';
      isAllInputsValid = false;
    } else {
      if (!isEmailValid(Registration.email.value.trim())) {
        y['email']['error'] = 'Please enter a valid email address';
        isAllInputsValid = false;
      }
      //TODO:
      // check for -- email should belong to organization personal domain
    }

    // check for password
    if (isEmpty(Registration.password.value.trim())) {
      y['password']['error'] = 'Password cannot be empty';
      isAllInputsValid = false;
    } else {
      const MinMax = checkLength(Registration.password.value.trim(), 8, 14);
      if (MinMax === 'min') {
        y['password']['error'] = 'Password should be atleast 8 characters.';
        isAllInputsValid = false;
      } else if (MinMax === 'max') {
        y['password']['error'] = 'Password should be less than 14 characters.';
        isAllInputsValid = false;
      }
    }

    // check's for confirm password
    if (isEmpty(Registration.confirm_password.value.trim())) {
      y['confirm_password']['error'] = 'Confirm Password cannnot be empty';
      isAllInputsValid = false;
    } else {
      if (
        !isSame(
          Registration.password.value.trim(),
          Registration.confirm_password.value.trim(),
        )
      ) {
        y['confirm_password']['error'] = 'Passwords do not match';
        isAllInputsValid = false;
      }
    }

    // check for location
    if (isEmpty(Registration.location.value.trim())) {
      y['location']['error'] = 'Location cannot be empty';
      isAllInputsValid = false;
    }

    if (
      Registration.incorpDate.value.toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      isAllInputsValid = false;
      y['incorpDate']['error'] = 'Invalid date.';
    } else if (Registration.incorpDate.value > new Date()) {
      isAllInputsValid = false;
      y['incorpDate']['error'] = 'Invalid date.';
    }

    // set registration
    setRegistration(props => {
      return {
        ...props,
        y,
      };
    });

    // check if all inputs are valid or not
    if (isAllInputsValid) {
      try {
        const signUpResponse = await axios.post('/user/organization/signup/', {
          name: Registration.name.value.trim(),
          reg_no: Registration.reg_no.value,
          email: Registration.email.value.trim(),
          password: Registration.password.value.trim(),
          location: Registration.location.value.trim(),
          incorporation_date: Registration.incorpDate.value
            .toISOString()
            .split('T')[0],
        });

        if (signUpResponse.status === 201) {
          const userData = {
            name: Registration.name.value.trim(),
            regNo: Registration.reg_no.value.trim(),
            email: Registration.email.value.trim(),
            location: Registration.location.value.trim(),
            profilePic: '',
          };
          dispatch({type: 'SET_USER', payload: userData});
          dispatch({type: 'SET_USER_TYPE', payload: 'organization'});
          dispatch({type: 'SET_SIGN_IN', payload: true});

          // account has been created
          ToastAndroid.show(signUpResponse.data.success, 1500);
          navigation.goBack();
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
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      {/* date picker  */}
      {/* date time picker  */}
      <DateTimePicker
        open={modal.date}
        date={new Date()}
        mode={'date'}
        setDate={response => {
          // hide modal first
          setmodal(props => {
            return {
              ...props,
              date: false,
            };
          });
          const getDate = new Date(response);

          setRegistration(props => {
            return {
              ...props,
              incorpDate: {
                value: getDate,
                error: '',
              },
            };
          });
        }}
        cancel={() =>
          setmodal(props => {
            return {
              ...props,
              date: true,
            };
          })
        }
      />

      <LocationModal
        isShow={modal.location}
        toggleModal={() =>
          setmodal(props => {
            return {
              ...props,
              location: false,
            };
          })
        }
        setlocation={value =>
          setRegistration(props => {
            return {
              ...props,
              location: {
                value: value,
                error: '',
              },
            };
          })
        }
      />
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <>
          {/* platformX logo  */}
          <View style={styles.logoContainer}>
            <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>
              {'<'}
            </Text>
            <Text style={[styles.logo, {color: theme.TEXT_COLOR}]}>
              PlatformX
            </Text>
            <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>
              {'/>'}
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            {/* first name field  */}
            <CustomTextField
              placeholder={'Organization Full Name'}
              defaultValue={Registration.name.value}
              onChangeText={text => {
                setRegistration(props => {
                  return {
                    ...props,
                    name: {
                      value: text,
                      error: '',
                    },
                  };
                });
              }}
              textContentType={'name'}
              keyboardType={'default'}
              autoFocus
              error={Registration.name.error}
              placeholderColor={state.theme.PLACE_HOLDER_TEXT_COLOR}
            />
            {/* registration number field  */}
            <CustomTextField
              placeholder={'Registation Number'}
              defaultValue={Registration.reg_no.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    reg_no: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'organizationName'}
              keyboardType={'decimal-pad'}
              error={Registration.reg_no.error}
              placeholderColor={state.theme.PLACE_HOLDER_TEXT_COLOR}
            />

            {/* organization location  */}
            <View>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Location
              </Text>
            </View>
            <View style={[{marginVertical: 20}]}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      location: true,
                    };
                  })
                }>
                <View
                  style={[
                    styles.selectionContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Registration.location.error !== ''
                          ? theme.ERROR_TEXT_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      padding: 6,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.selectionText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    {Registration.location.value !== ''
                      ? Registration.location.value
                      : 'Select City'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* error container  */}
            {Registration.location.error !== '' && (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                  {Registration.location.error}
                </Text>
              </View>
            )}

            <View>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Incorporation Date
              </Text>
            </View>
            <View style={[{marginVertical: 20}]}>
              <TouchableOpacity
                onPress={() => {
                  setmodal(props => {
                    return {
                      ...props,
                      date: true,
                    };
                  });
                }}
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    borderColor:
                      Registration.incorpDate.error !== ''
                        ? theme.ERROR_TEXT_COLOR
                        : theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Registration.incorpDate.value.toDateString()}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Calendar size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
              {Registration.incorpDate.error !== '' && (
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Text
                    style={[{color: theme.ERROR_TEXT_COLOR}, styles.errorText]}>
                    {Registration.incorpDate.error}
                  </Text>
                </View>
              )}
            </View>
            {/* email  */}
            <CustomTextField
              placeholder={'Business Email'}
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
              placeholderColor={state.theme.PLACE_HOLDER_TEXT_COLOR}
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
              placeholderColor={state.theme.PLACE_HOLDER_TEXT_COLOR}
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
              placeholderColor={state.theme.PLACE_HOLDER_TEXT_COLOR}
            />
          </View>
          {/* submit button container  */}
          <View style={styles.submitButtonContainer}>
            <CustomButton
              text="Sign Up"
              loading={isLoading}
              onPress={handleSignUp}
            />
            {/* sign up container  */}
            <View style={styles.signInContainer}>
              <Text style={[styles.signInText, {color: theme.TEXT_COLOR}]}>
                Already have an account?
                <Text
                  style={[styles.signIn, {color: theme.GREEN_COLOR}]}
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bracket: {
    fontSize: Sizes.large * 2,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Regular',
  },
  container: {
    marginTop: 10,
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
  headingContainer: {
    marginVertical: 2,
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

  heading: {
    fontSize: Sizes.normal,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.85,
  },
  cardTextContainer: {
    flex: 0.75,
    paddingLeft: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconContainer: {
    flex: 0.25,
  },
  cardText: {
    fontSize: Sizes.normal * 0.75,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    width: Width * 0.8,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  selectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectionText: {
    fontSize: Sizes.normal * 0.95,
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
