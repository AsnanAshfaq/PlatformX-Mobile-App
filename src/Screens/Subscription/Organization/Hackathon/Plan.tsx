/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomHeader from '../../../../Components/CustomHeader';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import Divider from '../../../../Components/Divider';
import {commaSeperator} from '../../../../Utils/Numbers';
import {HACKATHON_SUSCRIPTIONS} from '../../../../Constants/sample';
type cardProps = {
  selectedPlan: 'basic' | 'standard' | 'premium';
};
const Card: FC<cardProps> = ({selectedPlan}) => {
  const {theme} = useStateValue()[0];

  return (
    <View
      style={[
        styles.container,
        styles.cardContainer,
        {backgroundColor: theme.CARD_BACKGROUND_COLOR},
      ]}>
      {/* heading container  */}
      <View style={styles.cardTopContainer}>
        <View style={{flex: 0.25}} />
        <View style={[styles.cardHeadingContainer]}>
          <View style={[styles.cardHeadingTextContainer, {paddingLeft: 25}]}>
            <Text
              style={[
                styles.pointedViewLabel,
                {
                  color:
                    selectedPlan === 'basic'
                      ? theme.TEXT_COLOR
                      : theme.DIM_TEXT_COLOR,
                  marginRight: 15,
                  fontSize: Sizes.normal * 0.9,
                },
              ]}>
              Basic
            </Text>
          </View>
          <View
            style={{
              height: 15,
              marginTop: 4,
              width: 1.2,
              backgroundColor: theme.DIVIDER_COLOR,
            }}
          />
        </View>
        <View style={[styles.cardHeadingContainer]}>
          <View
            style={[styles.cardHeadingTextContainer, {alignItems: 'flex-end'}]}>
            <Text
              style={[
                styles.pointedViewLabel,
                {
                  color:
                    selectedPlan === 'standard'
                      ? theme.TEXT_COLOR
                      : theme.DIM_TEXT_COLOR,
                  marginRight: 15,
                  fontSize: Sizes.normal * 0.9,
                },
              ]}>
              Standard
            </Text>
          </View>
          <View
            style={{
              height: 15,
              marginTop: 4,
              width: 1.2,
              backgroundColor: theme.DIVIDER_COLOR,
            }}
          />
        </View>
        <View style={[styles.cardHeadingContainer]}>
          <Text
            style={[
              styles.pointedViewLabel,
              {
                color:
                  selectedPlan === 'premium'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize: Sizes.normal * 0.9,
              },
            ]}>
            Premium
          </Text>
        </View>
      </View>

      {/* charges container  */}
      <View style={[styles.detailsContainer, {marginTop: 20}]}>
        <View style={styles.detailsViewContainer}>
          <View style={styles.detailsHeadingContainer}>
            <Text
              style={[
                styles.detailHeadingText,
                {color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.9},
              ]}>
              Charges
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'basic'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'basic'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              Rs {commaSeperator(HACKATHON_SUSCRIPTIONS.basic.charges)}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'standard'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'standard'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              Rs {commaSeperator(HACKATHON_SUSCRIPTIONS.standard.charges)}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'premium'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'premium'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              Rs {commaSeperator(HACKATHON_SUSCRIPTIONS.premium.charges)}
            </Text>
          </View>
        </View>
      </View>
      <Divider width={Width * 0.85} marginHorizontal={Width * 0.02} />

      {/* duration container  */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsViewContainer}>
          <View style={styles.detailsHeadingContainer}>
            <Text
              style={[
                styles.detailHeadingText,
                {color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.9},
              ]}>
              Duration
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'basic'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'basic'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              {HACKATHON_SUSCRIPTIONS.basic.duration}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'standard'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'standard'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              {HACKATHON_SUSCRIPTIONS.standard.duration}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'premium'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'premium'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              {HACKATHON_SUSCRIPTIONS.premium.duration}
            </Text>
          </View>
        </View>
      </View>
      <Divider width={Width * 0.85} marginHorizontal={Width * 0.02} />

      {/* number of hackathons container  */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsViewContainer}>
          <View style={styles.detailsHeadingContainer}>
            <Text
              style={[
                styles.detailHeadingText,
                {color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.9},
              ]}>
              Number of hackathons
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'basic'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'basic'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              {HACKATHON_SUSCRIPTIONS.basic.hackathons}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'standard'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'standard'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              {HACKATHON_SUSCRIPTIONS.standard.hackathons}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'premium'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'premium'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              {HACKATHON_SUSCRIPTIONS.premium.hackathons}
            </Text>
          </View>
        </View>
      </View>

      <Divider width={Width * 0.85} marginHorizontal={Width * 0.02} />

      {/* max prize container  */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsViewContainer}>
          <View style={styles.detailsHeadingContainer}>
            <Text
              style={[
                styles.detailHeadingText,
                {color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.9},
              ]}>
              Max prize money
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'basic'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'basic'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              Rs {commaSeperator(HACKATHON_SUSCRIPTIONS.basic.max_prize_money)}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'standard'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'standard'
                    ? Sizes.normal * 0.9
                    : Sizes.normal * 0.75,
              }}>
              Rs{' '}
              {commaSeperator(HACKATHON_SUSCRIPTIONS.standard.max_prize_money)}
            </Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text
              style={{
                color:
                  selectedPlan === 'premium'
                    ? theme.TEXT_COLOR
                    : theme.DIM_TEXT_COLOR,
                fontSize:
                  selectedPlan === 'premium'
                    ? Sizes.normal * 0.82
                    : Sizes.normal * 0.75,
              }}>
              Rs {HACKATHON_SUSCRIPTIONS.premium.max_prize_money}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
type props = {
  navigation: any;
};
const Plan: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  const [plan, setplan] = useState<'basic' | 'standard' | 'premium'>('basic');

  const getCharges = () => {
    return plan === 'basic'
      ? HACKATHON_SUSCRIPTIONS.basic.charges
      : plan === 'standard'
      ? HACKATHON_SUSCRIPTIONS.standard.charges
      : HACKATHON_SUSCRIPTIONS.premium.charges;
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
      <View style={styles.wrapper}>
        {/* step container  */}
        <View style={[styles.container]}>
          <Text style={[styles.smallText, {color: theme.TEXT_COLOR}]}>
            Step 1 of 2
          </Text>
        </View>
        <View style={[styles.container, styles.center]}>
          <HelpText
            text={'Choose a plan that works best for you and your team.'}
          />
        </View>

        {/* plans  */}
        <View
          style={[
            styles.container,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <TouchableOpacity
            onPress={() => setplan('basic')}
            activeOpacity={0.5}
            style={{alignItems: 'center'}}>
            <View
              style={[
                styles.pointedViewContainer,
                {
                  backgroundColor:
                    plan === 'basic'
                      ? theme.GREEN_COLOR
                      : theme.CARD_BACKGROUND_COLOR,
                },
              ]}>
              <Text
                style={[
                  styles.pointedViewLabel,
                  {
                    color:
                      plan === 'basic'
                        ? theme.TEXT_COLOR
                        : theme.DIM_TEXT_COLOR,
                  },
                ]}>
                Basic
              </Text>
            </View>
            {plan === 'basic' && (
              <View
                style={[styles.pointer, {borderBottomColor: theme.GREEN_COLOR}]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setplan('standard')}
            activeOpacity={0.5}
            style={{alignItems: 'center'}}>
            <View
              style={[
                styles.pointedViewContainer,
                {
                  backgroundColor:
                    plan === 'standard'
                      ? theme.GREEN_COLOR
                      : theme.CARD_BACKGROUND_COLOR,
                },
              ]}>
              <Text
                style={[
                  styles.pointedViewLabel,
                  {
                    color:
                      plan === 'standard'
                        ? theme.TEXT_COLOR
                        : theme.DIM_TEXT_COLOR,
                  },
                ]}>
                Standard
              </Text>
            </View>
            {plan === 'standard' && (
              <View
                style={[styles.pointer, {borderBottomColor: theme.GREEN_COLOR}]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setplan('premium')}
            activeOpacity={0.5}
            style={{alignItems: 'center'}}>
            <View
              style={[
                styles.pointedViewContainer,
                {
                  backgroundColor:
                    plan === 'premium'
                      ? theme.GREEN_COLOR
                      : theme.CARD_BACKGROUND_COLOR,
                },
              ]}>
              <Text
                style={[
                  styles.pointedViewLabel,
                  {
                    color:
                      plan === 'premium'
                        ? theme.TEXT_COLOR
                        : theme.DIM_TEXT_COLOR,
                  },
                ]}>
                Premium
              </Text>
            </View>
            {plan === 'premium' && (
              <View
                style={[styles.pointer, {borderBottomColor: theme.GREEN_COLOR}]}
              />
            )}
          </TouchableOpacity>
        </View>
        {/* details card */}

        <View
          style={[
            styles.container,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <Card selectedPlan={plan} />
        </View>
      </View>

      <View style={{flex: 0.1}}>
        <CustomButton
          onPress={() => {
            navigation.navigate('Payment', {
              plan: {
                type: plan,
                charges: getCharges(),
              },
            });
          }}
          text={'Choose Plan'}
        />
      </View>
    </View>
  );
};

export default Plan;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: Width * 0.04,
    flex: 0.9,
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
  pointedViewContainer: {
    width: Width * 0.27,
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointedViewLabel: {
    fontSize: Sizes.normal * 0.9,
    fontWeight: 'bold',
  },
  cardContainer: {
    padding: 4,
    borderRadius: 10,
    borderColor: 'transparent',
    paddingBottom: 20,
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    marginTop: -2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '180deg'}],
  },
  cardTopContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  cardHeadingContainer: {
    flex: 0.25,
    flexDirection: 'row',
    marginHorizontal: Width * 0.01,
    justifyContent: 'center',
  },
  cardHeadingTextContainer: {
    flex: 1,
  },
  detailsContainer: {
    marginTop: 6,
    marginBottom: 6,
    marginHorizontal: Width * 0.01,
  },
  detailsViewContainer: {
    flexDirection: 'row',
  },
  detailsHeadingContainer: {
    flex: 0.25,
    marginHorizontal: Width * 0.015,
  },
  detailsTextContainer: {
    flex: 0.25,
    marginHorizontal: Width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailHeadingText: {
    fontSize: Sizes.normal * 0.9,
  },
});
