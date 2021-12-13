/* eslint-disable no-sparse-arrays */
import React, {FC, useState, useEffect} from 'react';
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
import CheckBox from '../Components/CheckBox';
import {useStateValue} from '../Store/StateProvider';
import Divider from '../Components/Divider';
import CustomButton from '../Components/CustomButton';
import Bullet from '../Components/Bullet';
import HelpText from '../Components/HelpText';

type Props = {
  point: string;
};

const BulletView: FC<Props> = ({point}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={{flexDirection: 'row'}}>
      <Bullet />
      <Text style={[styles.descriptionText, {color: theme.DIM_TEXT_COLOR}]}>
        {point}
      </Text>
    </View>
  );
};

type props = {
  isShow: boolean;
  name: string;
  toggleModal: () => void;
};
const FYPDetailsModal: FC<props> = ({name, isShow, toggleModal}) => {
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
      <View style={{flex: 1}}>
        <View style={styles.headingContainer}>
          <Text
            style={[
              styles.heading,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Details{' '}
          </Text>
          <Divider size={'medium'} />
        </View>
        <View style={[styles.container, styles.nameContainer, styles.center]}>
          <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
            {name}
          </Text>
          <HelpText text={'Follow the steps below to proceed further.'} />
        </View>

        <View style={[styles.container, styles.descriptionContainer]}>
          <BulletView point={'Login to Platformx Website.'} />

          <BulletView point={`Under FYP Section, View details of ${name}.`} />

          <BulletView
            point={
              'Read the instructions and the coding problem statement carefully.'
            }
          />

          <BulletView
            point={'Submit your code within the due date of the test.'}
          />
        </View>
        {/* done button  */}
        <View style={styles.applyButtonContainer}>
          <CustomButton
            text={'Ok Got it'}
            onPress={() => toggleModal()}
            height={Width * 0.085}
            width={Width * 0.35}
          />
        </View>
      </View>
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
    borderColor: 'transparent',
    marginVertical: Height * 0.25,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    flex: 0.2,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
  },
  nameContainer: {
    flex: 0.15,
  },
  descriptionContainer: {
    flex: 0.45,
    marginTop: 10,
    marginLeft: Width * 0.08,
    marginRight: Width * 0.1,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.85,
    lineHeight: 22,
    flexShrink: 1,
  },
  scroll: {
    marginVertical: 15,
  },
  smallText: {
    fontSize: Sizes.small,
  },
  container: {
    marginHorizontal: Width * 0.05,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonContainer: {
    flex: 0.2,
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
export default FYPDetailsModal;
