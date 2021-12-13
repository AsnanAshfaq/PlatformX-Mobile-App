/* eslint-disable no-sparse-arrays */
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import Divider from '../Components/Divider';
import LottieView from 'lottie-react-native';
import Tick from '../Animations/Lottie/Tick';

type props = {
  isShow: boolean;
  details: any;
  toggleModal: () => void;
  isStartingEarly: boolean;
  startWorkshop: () => void;
};

const StartWorkshopModal: FC<props> = ({
  isShow,
  details,
  isStartingEarly = false,
  toggleModal,
  startWorkshop,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <Modal
      isVisible={isShow}
      style={[
        styles.Modalparent,
        {
          backgroundColor: theme.MODAL_BACKGROUND_COLOR,
          marginVertical: !isStartingEarly ? Height * 0.19 : Height * 0.22, //Height * 0.27
          height: !isStartingEarly ? Height * 0.54 : Height * 0.46,
        },
      ]}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      backdropColor={'#575959'}
      backdropOpacity={0.3}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <>
        {!isStartingEarly ? (
          <>
            <View style={styles.headingContainer}>
              <Text
                style={[
                  styles.heading,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Workshop has been started
              </Text>
            </View>
            <Divider marginHorizontal={Width * 0.04} size={'large'} />

            <View style={styles.descriptionContainer}>
              <Text style={[styles.descText, {color: theme.TEXT_COLOR}]}>
                An email has been sent to you, workshop speaker and all the
                workshop attendees containing meeting link and other
                instructions.{'\n'}
                Thank you for hosting this workshop.
              </Text>
            </View>
            <View style={styles.animationContainer}>
              <Tick loop={false} />
            </View>
            {/* done button  */}
            <View style={styles.applyButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  // toggle modal first
                  toggleModal();
                  startWorkshop();
                }}
                style={[
                  styles.applyButton,
                  {
                    backgroundColor: theme.GREEN_COLOR,
                  },
                ]}>
                <Text
                  style={[
                    styles.apply,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 0.17,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 3,
              }}>
              <Text
                style={[
                  styles.heading,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Starting too soon
              </Text>
            </View>
            <Divider marginHorizontal={Width * 0.04} size={'large'} />

            <View
              style={{
                flex: 0.25,
                marginHorizontal: Width * 0.04,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.descText, {color: theme.TEXT_COLOR}]}>
                Do you really want to start your workshop now? {'\n'}
              </Text>
            </View>
            <View
              style={{
                flex: 0.45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../assets/lottie/clock.json')}
                style={styles.animation}
                autoPlay
                loop={true}
                colorFilters={[
                  {
                    keypath: 'Hour',
                    color: theme.GREEN_COLOR,
                  },
                  {
                    keypath: 'Minute',
                    color: theme.GREEN_COLOR,
                  },
                  {
                    keypath: 'Circle',
                    color: theme.GREEN_COLOR,
                  },
                ]}
              />
            </View>
            {/* done button  */}
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  // toggle modal first
                  toggleModal();
                  startWorkshop();
                }}
                style={[
                  styles.applyButton,
                  {
                    backgroundColor: theme.GREEN_COLOR,
                  },
                ]}>
                <Text
                  style={[
                    styles.apply,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Start AnyWay
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    borderColor: 'transparent',
    marginVertical: Height * 0.19, //Height * 0.27
    height: Height * 0.54,
  },
  headingContainer: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  heading: {
    fontSize: Sizes.normal * 1.25,
  },
  descriptionContainer: {
    flex: 0.38,
    marginHorizontal: Width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descText: {
    fontSize: Sizes.normal,
    lineHeight: 24,
    textAlign: 'center',
    flexShrink: 1,
  },
  animationContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: Width * 0.3,
    height: Width * 0.3,
  },
  applyButtonContainer: {
    // flex: 0.1,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  applyButton: {
    width: Width * 0.35,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  apply: {
    fontSize: Sizes.normal,
  },
});
export default StartWorkshopModal;
