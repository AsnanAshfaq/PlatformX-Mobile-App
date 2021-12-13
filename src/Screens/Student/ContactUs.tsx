import React, {FC, useState} from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import HelpText from '../../Components/HelpText';
import {Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import LottieView from 'lottie-react-native';
import CustomButton from '../../Components/CustomButton';
import CustomTextField from '../../Components/CustomTextField2';
import axios from '../../Utils/Axios';

type props = {
  navigation: any;
};
const ContactUs: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  const [loading, setloading] = useState(false);
  const [Input, setInput] = useState({
    value: '',
    error: '',
  });

  const handlePress = () => {
    setloading(true);
    if (Input.value.trim().length === 0) {
      setloading(false);

      setInput(props => {
        return {
          value: '',
          error: 'Empty message cannot be sent',
        };
      });
    } else {
      axios
        .post('/user/query/', {
          query: Input.value.trim(),
        })
        .then(response => {
          setloading(false);

          if (response.status === 201) {
            ToastAndroid.show(response.data.success, 1500);
          }
          setInput(props => {
            return {
              value: '',
              error: '',
            };
          });
        })
        .catch(error => {
          setloading(false);

          if (error.response) {
            ToastAndroid.show(error.response.data.success, 1500);
          }
          return error.response;
        });
    }
  };

  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        title={'Contact Us'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <>
            <View style={[styles.container, styles.margin]}>
              <HelpText
                text={
                  "Have a query or any question? We're there to help you. Just fill the form below."
                }
              />
            </View>
            <View style={(styles.margin, styles.container)}>
              {/* lottie file  */}
              <View style={styles.animationContainer}>
                <LottieView
                  source={require('../../../assets/lottie/contact_us.json')}
                  style={styles.animation}
                  autoPlay
                  loop={true}
                  autoSize
                  resizeMode={'cover'}
                  colorFilters={[
                    {
                      keypath: 'BG',
                      color: theme.GREEN_COLOR,
                    },
                  ]}
                />
              </View>
              {/* form container  */}
              <View style={[styles.container, styles.margin]}>
                <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
                  <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                    Message
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <CustomTextField
                    defaultValue={Input.value}
                    keyboardType={'default'}
                    onChangeText={text => {
                      setInput(props => {
                        return {
                          value: text,
                          error: '',
                        };
                      });
                    }}
                    placeholder={'Enter your query or question'}
                    placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                    textContentType={'fullStreetAddress'}
                    maxLength={300}
                    width={Width * 0.9}
                    error={Input.error}
                    // height={Width * 0.3}
                    multiLine
                    showLength
                  />
                </View>
              </View>
              <View style={[styles.container, styles.margin]}>
                <Text style={[styles.noteText, {color: theme.DIM_TEXT_COLOR}]}>
                  Write us an email on{' '}
                  <TouchableWithoutFeedback
                    onPress={() =>
                      Linking.openURL(
                        'mailto:18asnan@gmail.com?subject=Asking For Help',
                      )
                    }>
                    <Text style={[styles.noteText, {color: theme.GREEN_COLOR}]}>
                      18asnan@gmail.com
                    </Text>
                  </TouchableWithoutFeedback>{' '}
                  to directly contact us.
                </Text>
              </View>
            </View>
          </>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton text={'Send'} onPress={handlePress} loading={loading} />
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.9,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: Width * 0.7,
    height: Width * 0.7,
  },
  noteText: {
    fontSize: Sizes.normal * 0.72,
  },
});
