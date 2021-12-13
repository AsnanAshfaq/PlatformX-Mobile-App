import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
  View,
} from 'react-native';
import {Height, Sizes, Width} from '../../Constants/Size';
import CustomTextField from '../../Components/CustomTextField';
import Axios from '../../Utils/Axios';
import FormHandlers from '../../Utils/FormHandler';
import Loading from '../../Components/Loading';
import {useStateValue} from '../../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  navigation: any;
};

const ICON_SIZE = Width * 0.07;

const ResetPassword: FC<props> = ({navigation}) => {
  const [Email, setEmail] = useState({
    value: '',
    error: '',
  });
  const [isLoading, setisLoading] = useState(false);
  const [{theme}, dispatch] = useStateValue();
  // get some handlers
  const {isEmailValid, isEmpty} = FormHandlers();

  const sendCode = () => {
    // checks for email
    if (isEmpty(Email.value)) {
      setEmail(props => {
        return {
          ...props,
          error: 'Email cannnot be Empty',
        };
      });
    } else if (!isEmailValid(Email.value)) {
      setEmail(props => {
        return {
          ...props,
          error: 'Please enter a valid email address',
        };
      });
    } else {
      // email is not empty and is valid
      setisLoading(true);
      Axios.post('/user/password_reset/', {
        email: Email.value,
      })
        .then(response => {
          if (response.status === 200) {
            // navigate to code confirmation screen
            ToastAndroid.show(response.data.success, 1500);
            navigation.navigate('codeConfirmation', {
              otp: response.data.otp,
              email: Email.value,
            });
          }
          setisLoading(false);
        })
        .catch(error => {
          setisLoading(false);
          if (error.response.data.email_error) {
            setEmail(props => {
              return {
                ...props,
                error: error.response.data.email_error,
              };
            });
          } else if (error.response.data.user_error) {
            setEmail(props => {
              return {
                ...props,
                error: error.response.data.user_error,
              };
            });
          } else if (error.response.data.error) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
        });
    }
  };

  useEffect(() => {
    return () => {
      setEmail(props => {
        return {
          error: '',
          value: '',
        };
      });
    };
  }, []);

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
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons
            name={'chevron-back'}
            color={theme.ICON_COLOR}
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
          Reset Password
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <CustomTextField
          defaultValue={Email.value}
          onChangeText={text =>
            setEmail(props => {
              return {
                ...props,
                value: text,
                error: '',
              };
            })
          }
          placeholder={'Email Address'}
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          error={Email.error}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.simpleText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Enter the email associated with your account and we'll send an email
            with a code to reset your password.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.GREEN_COLOR,
            },
          ]}
          onPress={() => sendCode()}>
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
              Send Code
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;

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
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: Width * 0.08,
  },
  textContainer: {
    marginVertical: 20,
  },
  simpleText: {
    fontSize: Sizes.normal * 0.8,
  },
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
