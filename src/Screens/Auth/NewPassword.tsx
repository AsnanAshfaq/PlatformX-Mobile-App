import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {Height, Sizes, Width} from '../../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextField from '../../Components/CustomTextField';
import Loading from '../../Components/Loading';
import FormHandlers from '../../Utils/FormHandler';
import Axios from '../../Utils/Axios';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
  route: any;
};

const ICON_SIZE = Width * 0.07;

const NewPassword: FC<props> = ({navigation, route}) => {
  const [ResetPassword, setResetPassword] = useState({
    password: {value: '', error: ''},
    confirmPassword: {value: '', error: ''},
  });
  const [isLoading, setisLoading] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  const resetPasword = () => {
    let isAllInputsValid = true;
    setisLoading(true);
    // get some handers
    const {checkLength, isSame, isEmpty} = FormHandlers();

    // check's for password
    if (isEmpty(ResetPassword.password.value.trim())) {
      isAllInputsValid = false;
      setResetPassword(props => {
        return {
          ...props,
          password: {
            value: props.password.value,
            error: 'Password cannot be empty',
          },
        };
      });
    } else {
      const MinMax = checkLength(ResetPassword.password.value.trim(), 8, 14);
      let error = '';
      if (MinMax === 'min') {
        error = 'Password should be atleast 8 characters.';
      } else if (MinMax === 'max') {
        error = 'Password should be less than 14 characters.';
      }
      setResetPassword(props => {
        isAllInputsValid = false;
        return {
          ...props,
          password: {
            value: props.password.value,
            error: error,
          },
        };
      });
    }

    // check for confirm password
    if (isEmpty(ResetPassword.confirmPassword.value.trim())) {
      isAllInputsValid = false;
      setResetPassword(props => {
        return {
          ...props,
          confirmPassword: {
            value: props.confirmPassword.value,
            error: 'Confirm Password cannot be empty',
          },
        };
      });
    } else {
      if (
        !isSame(
          ResetPassword.password.value.trim(),
          ResetPassword.confirmPassword.value.trim(),
        )
      ) {
        isAllInputsValid = false;
        setResetPassword(props => {
          return {
            ...props,
            confirmPassword: {
              value: props.confirmPassword.value,
              error: 'Passwords do not match',
            },
          };
        });
      }
    }
    // if there is no error

    if (isAllInputsValid) {
      // then make the api call
      setisLoading(true);
      Axios.post('/user/password_reset/done/', {
        email: route.params.email,
        password: ResetPassword.password.value,
      })
        .then(response => {
          setisLoading(false);
          // if the response is 201
          // toast it
          // navigate to sign in screen
          if (response.status === 201) {
            ToastAndroid.show(response.data.success, 1500);
            navigation.navigate('SignIn');
          }
        })
        .catch(error => {
          setisLoading(false);
          // if error occurs
          // toast it
          ToastAndroid.show(error.response.data.error, 1500);
        });
    } else {
      setisLoading(false);
    }
  };
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* Back button  */}
      <View style={styles.backContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.pop(2)}>
          <Ionicons
            name={'chevron-back'}
            color={theme.TAB_BAR_ACTIVE_COLOR}
            size={ICON_SIZE}
          />
        </TouchableWithoutFeedback>
      </View>
      {/* title  */}
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.titleText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          Create New Password
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <CustomTextField
          defaultValue={ResetPassword.password.value}
          onChangeText={text =>
            setResetPassword(props => {
              return {
                ...props,
                password: {
                  value: text,
                  error: '',
                },
              };
            })
          }
          placeholder={'New Password'}
          textContentType={'password'}
          keyboardType={'default'}
          secureTextEntry
          error={ResetPassword.password.error}
          rightIcon
        />
        <CustomTextField
          defaultValue={ResetPassword.confirmPassword.value}
          onChangeText={text =>
            setResetPassword(props => {
              return {
                ...props,
                confirmPassword: {
                  value: text,
                  error: '',
                },
              };
            })
          }
          placeholder={'Confirm Password'}
          textContentType={'password'}
          keyboardType={'default'}
          secureTextEntry
          error={ResetPassword.confirmPassword.error}
          rightIcon
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.GREEN_COLOR,
            },
          ]}
          onPress={() => resetPasword()}>
          {isLoading ? (
            <Loading size={'small'} color={theme.SCREEN_BACKGROUND_COLOR} />
          ) : (
            <Text
              style={[
                styles.buttonText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {' '}
              {isLoading ? (
                <Loading size={'small'} color={theme.SCREEN_BACKGROUND_COLOR} />
              ) : (
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Reset Password Code
                </Text>
              )}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backContainer: {
    paddingVertical: (Height * 0.09) / 4,
    paddingLeft: 15,
    height: Height * 0.09,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: Width * 0.06,
  },
  titleText: {
    fontSize: Sizes.large * 1.5,
  },
  mainContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: Width * 0.08,
  },
  textContainer: {
    marginVertical: 20,
  },
  // simpleText: {
  //   // color: darkColors.TEXT_COLOR,
  //   fontSize: Sizes.normal * 0.8,
  // },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Sizes.normal,
  },
});
