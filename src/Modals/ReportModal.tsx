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
import ReportLottie from '../Animations/Lottie/Report';

type props = {
  isShow: boolean;
  title: string;
  description: string;
  toggleModal: () => void;
  handleReport: () => void;
};

const ReportModal: FC<props> = ({
  isShow,
  title,
  description,
  toggleModal,
  handleReport,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <Modal
      isVisible={isShow}
      style={[
        styles.Modalparent,
        {
          backgroundColor: theme.MODAL_BACKGROUND_COLOR,
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
        <>
          <View style={styles.headingContainer}>
            <Text
              style={[
                styles.heading,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {title}
            </Text>
          </View>
          <Divider marginHorizontal={Width * 0.04} size={'large'} />

          <View style={styles.descriptionContainer}>
            <Text style={[styles.descText, {color: theme.TEXT_COLOR}]}>
              {description}
            </Text>
          </View>
          <View style={styles.animationContainer}>
            <ReportLottie loop width={Width * 0.2} heigth={Width * 0.2} />
          </View>
          {/* done button  */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[
                styles.Button,
                {
                  backgroundColor: theme.GREEN_COLOR,
                },
              ]}>
              <Text style={[styles.buttonText, {color: theme.TEXT_COLOR}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleReport()}
              style={[
                styles.Button,
                {
                  backgroundColor: theme.ERROR_TEXT_COLOR,
                },
              ]}>
              <Text style={[styles.buttonText, {color: theme.TEXT_COLOR}]}>
                Report
              </Text>
            </TouchableOpacity>
          </View>
        </>
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
    marginVertical: Height * 0.28, //Height * 0.27
    height: Height * 0.45,
  },
  headingContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  heading: {
    fontSize: Sizes.normal * 1.25,
  },
  descriptionContainer: {
    flex: 0.2,
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
  buttonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    width: Width * 0.35,
    marginHorizontal: 10,
    height: Width * 0.1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: Sizes.normal,
  },
});
export default ReportModal;
