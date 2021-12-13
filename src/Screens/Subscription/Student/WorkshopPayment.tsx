/* eslint-disable react-native/no-inline-styles */
import React, {createRef, FC, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import LottieView from 'lottie-react-native';
import HelpText from '../../../Components/HelpText';
import CustomButton from '../../../Components/CustomButton';
import {LiteCreditCardInput} from 'react-native-credit-card-input';
import axios from '../../../Utils/Axios';
import JoinWorkshopModal from '../../../Modals/Workshop/StdJoin';
import CreditCard from '../../../Animations/Lottie/CreditCard';
type props = {
  navigation: any;
  route: any;
};
const Payment: FC<props> = ({navigation, route}) => {
  const {ID, title, charges} = route.params;
  const {theme} = useStateValue()[0];
  const [submit, setsubmit] = useState(false);
  const [Input, setInput] = useState<any>();
  const [error, seterror] = useState('');
  const [modal, setmodal] = useState(false);
  const handleRegister = () => {
    if (typeof Input !== 'undefined') {
      const isValid = Input.cardData.valid;
      if (isValid) {
        seterror('');
        // get values
        const {cvc, expiry, number, type} = Input.cardData.values;
        const data = {
          charges: charges,
          title: title + 'Workshop',
          description: 'Paying fees to attend workshop',
          cvc: cvc,
          expiry: expiry,
          number: number,
          type: type,
        };
        setsubmit(true);
        axios
          .post(`/api/workshop/${ID}/paid/register/`, data)
          .then(result => {
            if (result.status === 201) {
              setmodal(true);
            }
            setsubmit(false);
          })
          .catch(err => {
            setsubmit(false);
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
        title={'Payment'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <JoinWorkshopModal
        isShow={modal}
        toggleModal={() => {
          setmodal(false);
          // navigate to previous screen
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        }}
      />

      <ScrollView>
        <View style={[styles.scroll, styles.container]}>
          <View style={[styles.container, styles.center]}>
            <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
              Registering for {title} Workshop
            </Text>
          </View>

          <View style={styles.animationContainer}>
            <CreditCard loop={true} width={300} heigth={300} />
          </View>

          {/* charges container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Charges
              </Text>
            </View>
            <View
              style={[
                styles.chargesContainer,
                {
                  borderColor: theme.CARD_BACKGROUND_COLOR,
                },
              ]}>
              <Text style={[styles.heading, {color: theme.DIM_TEXT_COLOR}]}>
                Rs. {charges}
              </Text>
            </View>
          </View>
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
          {/* notes container  */}
          <View style={styles.container}>
            <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
              Note: You can always view your payment history under Payments
              Sections
            </Text>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        text={'Register'}
        onPress={handleRegister}
        loading={submit}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  titleText: {
    fontSize: Sizes.normal * 1.1,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  chargesContainer: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: Width * 0.04,
    padding: 7,
    marginTop: 10,
  },
  stripeContainer: {},
  field: {
    width: Width * 0.3,
    // color: '#449aeb',
    // borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
});
