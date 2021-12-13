//TODO:
// id
// amount
// created
// description
// card  -> brand
// receipt email
// receipt_url

import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import axios from '../../Utils/Axios';
import LottieView from 'lottie-react-native';
import CustomButton from '../../Components/CustomButton';
import {commaSeperator} from '../../Utils/Numbers';
import Payment from '../../Animations/Lottie/Payment';

type cardProps = {
  description: string;
  status: string;
  amount: number;
  plan: string;
  brand: string;
  receipt_email: string;
  created: any;
  receipt_url: string;
};
const Card: FC<cardProps> = ({
  description,
  status,
  plan,
  amount,
  brand,
  receipt_email,
  created,
  receipt_url,
}) => {
  const {theme} = useStateValue()[0];

  const handlePress = () => {
    Linking.openURL(receipt_url);
  };

  const charges = amount / (0.43 * 100);
  const timestamp = new Date(created * 1000).toLocaleDateString();

  return (
    <View
      style={[
        styles.container,
        styles.cardContainer,
        {
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      {/* topic container  */}
      <View style={[styles.descriptionContainer, styles.center]}>
        <Text style={[styles.descText, {color: theme.TEXT_COLOR}]}>
          {description}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={[styles.row]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, {color: theme.DIM_TEXT_COLOR}]}>
              Status{' '}
            </Text>
          </View>
          <View style={[styles.keyContainer]}>
            <Text style={[styles.key, {color: theme.TEXT_COLOR}]}>
              {status}{' '}
            </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, {color: theme.DIM_TEXT_COLOR}]}>
              Plan{' '}
            </Text>
          </View>
          <View style={[styles.keyContainer]}>
            <Text
              style={[
                styles.key,
                {color: theme.GREEN_COLOR, fontStyle: 'italic'},
              ]}>
              {plan.toUpperCase()}{' '}
            </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, {color: theme.DIM_TEXT_COLOR}]}>
              Charges{' '}
            </Text>
          </View>
          <View style={[styles.keyContainer]}>
            <Text
              style={[
                styles.key,
                {fontSize: Sizes.normal, color: theme.TEXT_COLOR},
              ]}>
              Rs. {commaSeperator(Math.round(charges))}
            </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, {color: theme.DIM_TEXT_COLOR}]}>
              Payment Method{' '}
            </Text>
          </View>
          <View style={[styles.keyContainer]}>
            <Text
              style={[
                styles.key,
                {color: theme.GREEN_COLOR, fontStyle: 'italic'},
              ]}>
              {brand.toUpperCase()}{' '}
            </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, {color: theme.DIM_TEXT_COLOR}]}>
              Receipt Email
            </Text>
          </View>
          <View style={[styles.keyContainer]}>
            <Text style={[styles.key, {color: theme.TEXT_COLOR}]}>
              {receipt_email}{' '}
            </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, {color: theme.DIM_TEXT_COLOR}]}>
              Created on
            </Text>
          </View>
          <View style={[styles.keyContainer]}>
            <Text style={[styles.key, {color: theme.TEXT_COLOR}]}>
              {timestamp}
            </Text>
          </View>
        </View>
      </View>

      {/* dowonload receipt button  */}
      <View style={[styles.center, styles.container]}>
        <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
          Payment receipt has also been sent as a mail at {receipt_email}.
        </Text>
        <CustomButton
          text={'View Online '}
          onPress={handlePress}
          width={Width * 0.35}
          textSize={Sizes.normal * 0.85}
          height={Width * 0.09}
        />
      </View>
    </View>
  );
};
type props = {
  navigation: any;
};
const Subscriptions: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  const [loading, setloading] = useState(true);
  const [payments, setPayments] = useState<any>({});

  const getData = () => {
    setloading(true);
    axios
      .get('/api/hackathon/subscriptions')
      .then(response => {
        setloading(false);
        setPayments(response.data);
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader
        title={'Subscriptions History'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      {/* fetch payments */}
      {!loading && Object.keys(payments).length > 0 ? (
        <>
          <View style={{flex: 1}}>
            <Card
              amount={payments.stripe.amount}
              plan={payments.plan}
              brand={payments.stripe.payment_method_details.card.brand}
              created={payments.stripe.created}
              description={payments.stripe.description}
              receipt_email={payments.stripe.receipt_email}
              receipt_url={payments.stripe.receipt_url}
              status={payments.stripe.outcome.seller_message}
            />
          </View>
        </>
      ) : !loading && Object.keys(payments).length === 0 ? (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.DIM_TEXT_COLOR}]}>
            You have not subscribed to any of our services yet
          </Text>
          <TouchableOpacity onPress={() => setloading(true)}>
            <Text style={[styles.normalText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Payment loop width={120} heigth={120} />
          <View style={styles.container}>
            <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
              Loading your Subscription...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    // marginVertical: 10,
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
  normalText: {
    fontSize: Sizes.normal,
  },
  descText: {
    fontSize: Sizes.normal,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 4,
    marginVertical: 2,
  },
  labelContainer: {
    flex: 0.35,
    alignItems: 'center',
  },
  label: {
    fontSize: Sizes.normal * 0.9,
  },
  keyContainer: {
    flex: 0.65,
    alignItems: 'center',
  },
  key: {
    fontSize: Sizes.normal * 0.9,
  },
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: Width * 0.04,
    // height: Height * 0.3,
  },
  contentContainer: {
    marginHorizontal: Width * 0.04,
  },
  contentText: {
    fontSize: Sizes.normal * 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
});
