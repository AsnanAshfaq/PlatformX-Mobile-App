import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';

type props = {
  isShow: boolean;
  toggleModal: () => void;
  description: string;
  heading: string;
  onShare: () => void;
};
const ShareModal: FC<props> = ({
  isShow,
  toggleModal,
  description,
  heading,
  onShare,
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
        {/* heading container  */}
        <View style={styles.headingContainer}>
          <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
            {heading}{' '}
          </Text>
        </View>
        {/* description container  */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            {description}{' '}
          </Text>
        </View>
        {/*  buttons  */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={toggleModal}
            style={[styles.Button, {backgroundColor: theme.BADGE_COLOR}]}>
            <Text style={[styles.buttonText, {color: theme.BACKGROUND_COLOR}]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShare()}
            style={[styles.Button, {backgroundColor: theme.BADGE_COLOR}]}>
            <Text style={[styles.buttonText, {color: theme.BACKGROUND_COLOR}]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    maxHeight: Height * 0.3,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    marginVertical: Height * 0.3,
  },
  headingContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.large * 1.3,
  },
  descriptionContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: Sizes.normal,
  },
  scroll: {
    marginHorizontal: 20,
    // marginVertical: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // backgroundColor: 'grey',
  },

  buttonsContainer: {
    flex: 0.25,
    flexDirection: 'row',
    marginVertical: 5,
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
export default ShareModal;
