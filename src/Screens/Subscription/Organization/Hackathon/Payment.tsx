/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomHeader from '../../../../Components/CustomHeader';
import HelpText from '../../../../Components/HelpText';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import {commaSeperator} from '../../../../Utils/Numbers';
import CheckBox from '../../../../Components/CheckBox';
import {LiteCreditCardInput} from 'react-native-credit-card-input';
import PolicyCheck from '../../../../Components/PolicyCheck';
import CreditCard from '../../../../Animations/Lottie/CreditCard';
import axios from '../../../../Utils/Axios';
import SubscribeModal from '../../../../Modals/Hackathon/Subscribe';
type props = {
  navigation: any;
  route: any;
};

const Payment: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];

  const [submit, setsubmit] = useState(false);
  const [Input, setInput] = useState<any>();
  const [error, seterror] = useState('');
  const [modal, setmodal] = useState(false);

  const {
    plan,
  }: {
    plan: {
      type: 'basic' | 'standard' | 'premium';
      charges: '';
    };
  } = route.params;

  const handlePay = () => {
    if (typeof Input !== 'undefined') {
      const isValid = Input.cardData.valid;
      if (isValid) {
        seterror('');
        // get values
        const {cvc, expiry, number, type} = Input.cardData.values;
        const data = {
          charges: plan.charges,
          plan: plan.type,
          cvc: cvc,
          expiry: expiry,
          number: number,
          type: type,
        };
        setsubmit(true);
        axios
          .post('/api/hackathon/subscribe/', data)
          .then(result => {
            if (result.status === 201) {
              setmodal(true);
            }
            setsubmit(false);
          })
          .catch(err => {
            setsubmit(false);
            setmodal(false);
            if (err.response) {
              ToastAndroid.show(err.response.data.error, 1500);
            }
            return err.response;
          });
        // call for api
      } else {
        seterror('Invalid Card Values');
      }
    } else {
      seterror('Please Enter Card Values');
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
      <CustomHeader
        title={'Subscription Plans'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <SubscribeModal
        isShow={modal}
        toggleModal={() => {
          setmodal(false);

          setTimeout(() => {
            navigation.navigate('HackahtonScreens', {
              screen: 'Create_Edit_Hackathon',
              params: {
                method: 'create',
              },
            });
          }, 400);
        }}
        plan={plan.type}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={[styles.container]}>
              <Text style={[styles.smallText, {color: theme.TEXT_COLOR}]}>
                Step 2 of 2
              </Text>
            </View>

            {/* image container */}
            <View style={[styles.container]}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Set up billing through stripe
                </Text>
              </View>
              <View style={styles.animationContainer}>
                <CreditCard loop={true} width={300} heigth={300} />
              </View>
            </View>

            {/* selected package container  */}
            <View>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Selected Package
                </Text>
              </View>
              <View
                style={[
                  styles.packageContainer,
                  {borderColor: theme.BORDER_COLOR, borderWidth: 1},
                ]}>
                <View
                  style={[
                    styles.center,
                    {
                      flex: 1,
                      borderRightWidth: 1,
                      borderRightColor: theme.DIVIDER_COLOR,
                    },
                  ]}>
                  <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                    Rs {commaSeperator(plan.charges)}
                  </Text>
                </View>
                <View style={[styles.center, {flex: 1}]}>
                  <Text
                    style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                    {plan.type.charAt(0).toUpperCase() +
                      plan.type.slice(1, plan.type.length)}
                  </Text>
                </View>
              </View>
            </View>

            {/* account number container  */}

            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Stripe Details
                </Text>
              </View>
              <HelpText text={'Provide your stripe account credentials.'} />
              <View
                style={{
                  borderColor:
                    error !== ''
                      ? theme.ERROR_TEXT_COLOR
                      : theme.CARD_BACKGROUND_COLOR,
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginHorizontal: Width * 0.04,
                  padding: 4,
                  marginTop: 10,
                }}>
                <LiteCreditCardInput
                  onChange={cardData => {
                    setInput({cardData});
                    seterror('');
                  }}
                  validColor={theme.TEXT_COLOR}
                  inputStyle={{color: theme.TEXT_COLOR}}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                />
              </View>
              {error !== '' && (
                <View style={[styles.center, styles.container]}>
                  <Text
                    style={[styles.smallText, {color: theme.ERROR_TEXT_COLOR}]}>
                    {error}
                  </Text>
                </View>
              )}
            </View>

            {/* check box container  */}
            {/* <View style={[styles.container]}>
              <View style={styles.checkBoxContainer}>
                <PolicyCheck
                  text={
                    'By checking the checkbox, you agree to our Terms and Conditions and Privacy Policy'
                  }
                  handleCheck={value => {
                    console.log('Check value is', value);
                    setisChecked({
                      error: '',
                      value: value,
                    });
                  }}
                />
              </View>
              {isChecked.error !== '' && (
                <Text
                  style={{
                    fontSize: Sizes.small,
                    color: theme.ERROR_TEXT_COLOR,
                  }}>
                  {isChecked.error}
                </Text>
              )}
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton text={'Subscribe'} onPress={handlePay} loading={submit} />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: Width * 0.04,
    flex: 0.9,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 10,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  headingContainer: {
    marginTop: 10,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 10,
    marginTop: 30,
  },
  image: {
    width: Width * 0.4,
    height: Width * 0.4,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal,
  },
  packageContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'transparent',
    marginTop: 10,
    // paddingHorizontal:
    paddingVertical: 8,
  },
  checkBoxContainer: {
    marginTop: 10,
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
});
