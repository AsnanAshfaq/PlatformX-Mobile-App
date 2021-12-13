import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from '../Utils/Axios';
import {useStateValue} from '../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  isShow: boolean;
  toggleModal: () => void;
  type: 'profile' | 'background' | '';
  isImageSet: boolean;
  refresh: any;
  imageID: string | null;
};

const ICON_SIZE = Width * 0.08;

const BottomImageModal: FC<props> = ({
  isShow,
  toggleModal,
  type,
  isImageSet,
  refresh,
  imageID,
}) => {
  const [state, dispatch] = useStateValue();
  const {theme} = state;
  const handleOpenGallery = () => {
    //   toggle the modal first
    toggleModal();

    var bodyFormData = new FormData();

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      // make a post api call
      // then reload the student profile
      bodyFormData.append('path', {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(
          'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
          '',
        ),
      });
      bodyFormData.append(
        'metadata',
        image.path
          .replace(
            'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
            '',
          )
          .substring(0, 20),
      );
      axios({
        method: 'post',
        url: `/user/profile_image/${isImageSet ? 'edit' : 'create'}/`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(response => {
          console.log(response.data.path);
          const userData = {
            ...state.user,
            profilePic: '/media/' + response.data.path,
          };
          console.log('User data is', userData);
          dispatch({type: 'SET_USER', payload: userData});

          ToastAndroid.show(`${response.data.success}`, 1500);
          // refresh the screen
          refresh();
        })
        .catch(error => {
          ToastAndroid.show(`${error.response.data.error}`, 1500);
        });
    });
  };

  const handleRemoveImage = () => {
    //   toggle the modal first
    toggleModal();

    axios({
      method: 'post',
      url: `/user/${
        type === 'profile' ? 'profile_image' : 'background_image'
      }/delete/`,
      data: {
        id: imageID,
      },
    })
      .then(response => {
        ToastAndroid.show(`${response.data.success}`, 1500);
        // refresh the screen
        refresh();
      })
      .catch(error => {
        ToastAndroid.show(`${error.response.data.error}`, 1500);
      });
    // refresh the screen
    refresh();
  };

  const handleViewImage = () => {
    console.log('Handling view image');
    //   toggle the modal first
    toggleModal();
  };

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
      animationOutTiming={300}
      backdropColor={'#575959'}
      backdropOpacity={0.4}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      coverScreen={true}
      useNativeDriver={true}
      swipeDirection={'down'}
      swipeThreshold={200}
      onSwipeComplete={toggleModal}
      // panResponderThreshold={6}
      // scrollOffset={1}
      // scrollOffsetMax={0}
      propagateSwipe={true}
      // onSwipeComplete={params => console.log(params)}
      // onSwipeMove={toggleHeight}
      deviceWidth={Width}
      deviceHeight={Height}
      useNativeDriverForBackdrop={true}>
      <>
        <View style={styles.container}>
          <View style={styles.roundContainer}>
            <View
              style={[
                styles.iconContainer,
                {
                  borderColor: theme.GREEN_COLOR,
                },
              ]}>
              <TouchableWithoutFeedback onPress={() => handleOpenGallery()}>
                <Ionicons
                  name={'md-image-outline'}
                  size={ICON_SIZE}
                  color={theme.GREEN_COLOR}
                  style={styles.icon}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text
              style={[
                styles.text,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Open Gallery
            </Text>
          </View>
          {isImageSet !== false && (
            <View style={styles.roundContainer}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    borderColor: theme.GREEN_COLOR,
                  },
                ]}>
                <TouchableWithoutFeedback onPress={() => handleViewImage()}>
                  <Ionicons
                    name={'person'}
                    size={ICON_SIZE}
                    color={theme.GREEN_COLOR}
                    style={styles.icon}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text
                style={[
                  styles.text,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                View Image
              </Text>
            </View>
          )}
          {isImageSet !== false && (
            <View style={styles.roundContainer}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    borderColor: theme.GREEN_COLOR,
                  },
                ]}>
                <TouchableWithoutFeedback onPress={() => handleRemoveImage()}>
                  <Ionicons
                    name={'trash'}
                    size={ICON_SIZE}
                    color={theme.GREEN_COLOR}
                    style={styles.icon}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text
                style={[
                  styles.text,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Remove Image
              </Text>
            </View>
          )}
        </View>
      </>
    </Modal>
  );
};

export default BottomImageModal;

const styles = StyleSheet.create({
  Modalparent: {
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: Height * 0.83,
    borderColor: 'transparent',
    paddingTop: 5,
    paddingHorizontal: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    width: Width,
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    // position: 'absolute',
  },
  roundContainer: {
    width: Width * 0.25,
    height: Height * 0.12,
    marginLeft: Width * 0.05,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
  },
  iconContainer: {
    borderRadius: 15,
    marginVertical: 6,
    padding: 10,
    borderWidth: 2,
  },
  icon: {},
  text: {
    fontSize: Sizes.normal * 0.8,
  },
});
