import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
type unFollow = {
  id: string;
  description: string;
  show: boolean;
};
type props = {
  toggleModal: () => void;
  unFollow: unFollow;
  heading: string;
};
const FilterModal: FC<props> = ({toggleModal, unFollow, heading}) => {
  const [{theme}, dispatch] = useStateValue();
  const unFollowUser = () => {
    console.log('Un following user', unFollow.id);
    // setshowModal(false);
    Axios.post('/user/following/delete', {
      id: unFollow.id,
    })
      .then(result => {
        if (result.status === 201) {
          ToastAndroid.show(result.data.success, 1500);
        } else {
          ToastAndroid.show(result.data.error, 1500);
        }
      })
      .then(() => {
        // then toggle the modal
        toggleModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    <Modal
      isVisible={unFollow.show}
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
          <Text
            style={[
              styles.heading,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {heading}{' '}
          </Text>
        </View>
        {/* description container  */}
        <View style={styles.descriptionContainer}>
          <Text
            style={[
              styles.descriptionText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {unFollow.description}{' '}
          </Text>
        </View>
        {/*  buttons  */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={toggleModal}
            style={[
              styles.Button,
              {
                backgroundColor: theme.BADGE_COLOR,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: theme.BACKGROUND_COLOR,
                },
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => unFollowUser()}
            style={[
              styles.Button,
              {
                backgroundColor: theme.BADGE_COLOR,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: theme.BACKGROUND_COLOR,
                },
              ]}>
              Unfollow
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
    // flex: 1,
    maxHeight: Height * 0.3,
    borderRadius: 20,
    borderWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    // margin: 0,
    // marginTop: Height * 0.28,
    // marginBottom: Height * 0.28,
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
export default FilterModal;
